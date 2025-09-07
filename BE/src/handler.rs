use std::sync::Arc;

use axum::{
    Json,
    extract::{
        State, WebSocketUpgrade,
        ws::{Message, Utf8Bytes, WebSocket},
    },
    http::StatusCode,
    response::{Html, IntoResponse},
};
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;

use crate::{AppState};

pub async fn websocket_handler(
    ws: WebSocketUpgrade,
    State(state): State<Arc<AppState>>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| websocket(socket, state))
}

async fn websocket(stream: WebSocket, state: Arc<AppState>) {
    let (mut sender, mut receiver) = stream.split();

    let mut username = String::new();

    while let Some(Ok(message)) = receiver.next().await {
        if let Message::Text(name) = message {
            check_username(&state, &mut username, name.as_str());

            if !username.is_empty() {
                break;
            } else {
                let _ = sender
                    .send(Message::Text(Utf8Bytes::from_static(
                        "Username already taken.",
                    )))
                    .await;

                return;
            }
        }
    }

    let mut rx = state.tx.subscribe();

    let msg = format!("{username} joined");
    tracing::debug!("{msg}");
    let _ = state.tx.send(msg);

    let mut send_task = tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            if sender.send(Message::text(msg)).await.is_err() {
                break;
            }
        }
    });

    let tx = state.tx.clone();
    let name = username.clone();

    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(Message::Text(text))) = receiver.next().await {
            let _ = tx.send(format!("{name}: {text}"));
        }
    });

    tokio::select! {
        _ = &mut send_task => recv_task.abort(),
        _ = &mut recv_task => send_task.abort(),
    };

    let msg = format!("{username} left");
    tracing::debug!("{msg}");
    let _ = state.tx.send(msg);

    state.user_set.lock().unwrap().remove(&username);
}

fn check_username(state: &AppState, string: &mut String, name: &str) {
    let mut user_set = state.user_set.lock().unwrap();

    if !user_set.contains(name) {
        user_set.insert(name.to_owned());

        string.push_str(name);
    }
}

pub async fn index() -> Html<&'static str> {
    Html(std::include_str!("../chat.html"))
}

pub async fn health_check_handler() -> impl IntoResponse {
    let json_response = serde_json::json!({
        "status": "success",
        "message": "Message"
    });

    Json(json_response)
}

#[derive(Deserialize, Debug)]
pub struct LoginRequest {
    email: String,
    google_id: String,
}

pub async fn login_handler(
    State(data): State<Arc<AppState>>,
    Json(payload): Json<LoginRequest>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let users = sqlx::query(r#"SELECT * FROM users WHERE google_id = ($1)"#)
        .bind(&payload.google_id)
        .fetch_all(&data.db)
        .await
        .map_err(|err| {
            let _error_response = serde_json::json!({
                "status": "error",
                "message": format!("Database error: { }", err)
            });
        });

    if users.iter().len() > 0 {
        let error_response = serde_json::json!({
            "status": "error",
            "message": "User email already exist"
        });

        return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
    }

    let query_result = sqlx::query(r#"INSERT INTO users (email, google_id) VALUES ($1, $2)"#)
        .bind(&payload.email)
        .bind(&payload.google_id)
        .execute(&data.db)
        .await
        .map_err(|err: sqlx::Error| err.to_string());

    match query_result {
        Ok(result) => {
            println!("{:?}", result)
        }
        Err(err) => println!("{err}"),
    };

    let response = serde_json::json!({
        "status": "success",
    });

    Ok(Json(response))
}
