use std::{sync::Arc};

use axum::{
    Json,
    extract::{
        State, WebSocketUpgrade,
        ws::{Message, Utf8Bytes, WebSocket},
    },
    http::StatusCode,
    response::{Html, IntoResponse},
};
use chrono::{Duration, Local, NaiveDateTime};
use futures_util::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use crate::{jwt::{handle_encode, verify_token, Claims, Provider}, AppState};
use sqlx::{prelude::FromRow, Row};

#[derive(Serialize)]
struct Response<T> {
    data: T
}

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
    token_id: String,
}

pub async fn login_handler(
    State(data): State<Arc<AppState>>,
    Json(payload): Json<LoginRequest>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let google_claims = verify_token(&payload.token_id, Provider::Google).await.unwrap();

    let user = sqlx::query(r#"SELECT * FROM users WHERE google_id = $1"#)
        .bind(&google_claims.sub)
        .fetch_one(&data.db)
        .await;
    match user {
        Ok(record) => {
            let id: i32 = record.try_get("id").unwrap();
            let response = generate_jwt_token(&id);

            Ok(Json(response))
        }
        Err(sqlx::Error::RowNotFound) => {
            let query_result =
                sqlx::query(r#"INSERT INTO users (email, google_id, name, image_url) VALUES ($1, $2, $3, $4) RETURNING id"#)
                    .bind(&google_claims.email)
                    .bind(&google_claims.sub)
                    .bind(&google_claims.name)
                    .bind(&google_claims.image_url)
                    .fetch_one(&data.db)
                    .await
                    .map_err(|err: sqlx::Error| err.to_string());
            
            match query_result {
                Ok(record) => {
                    let id: i32 = record.try_get("id").unwrap();
                    let response = generate_jwt_token(&id);

                    return Ok(Json(response));
                }
                Err(err) => {
                    let error_response = serde_json::json!({
                        "message": format!("Error while insert: { }", err)
                    });

                    return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
                },
            };
        }
        Err(err) => {
            let error_response = serde_json::json!({
                "message": format!("Database error: { }", err)
            });
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
        }
    }
}

#[derive(Deserialize, Debug)]
pub struct SearchRequest {
    email: String,
}

#[derive(Debug, Serialize, FromRow)]
struct User {
    id: i32,
    email: String,
    name: String,
    image_url: String,
    created_at: NaiveDateTime,
    updated_at: NaiveDateTime,
}

pub async fn search_handle (
    State(data): State<Arc<AppState>>,
    Json(payload): Json<SearchRequest>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    if payload.email.is_empty() {
       return Ok(Json(Response {data: vec![]}))
    }
    let users = sqlx::query_as::<_, User>(r#"SELECT * FROM users WHERE email like $1"#)
        .bind(format!("%{}%", &payload.email))
        .fetch_all(&data.db)
        .await;

    match users {
        Ok(rows) => Ok(Json(Response {data: rows})),
        Err(err) => {
            let error_response = serde_json::json!({
                "message": format!("Database error: { }", err)
            });
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
        }
    }
}

fn generate_jwt_token(user_id: &i32) -> serde_json::Value {
    let next_day = Local::now() + Duration::days(1);
    let claims = Claims {
        sub: user_id.to_string(),
        exp: next_day.timestamp_millis(),
    };
    let token = handle_encode(&claims).unwrap();
    serde_json::json!({
        "access_token": token,
    })
}
