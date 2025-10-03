use std::sync::Arc;

use axum::{
    middleware, routing::{get, post}, Router
};
use tower_http::cors::CorsLayer;

use crate::{
    handler::{
        health_check_handler, index, login_handler, search_handle, send_message_handler, websocket_handler
    }, jwt, AppState
};

pub fn create_route(app_state: Arc<AppState>, cors: CorsLayer) -> Router {
      let protected = Router::new()
        .route("/search", post(search_handle))
        .route("/send-message", post(send_message_handler))
        .layer(middleware::from_fn(jwt::auth_midldleware));

    Router::new()
        .route("/api/healthcheck", get(health_check_handler))
        .route("/", get(index))
        .route("/websocket", get(websocket_handler))
        .route("/login", post(login_handler))
        .merge(protected)
        .with_state(app_state) 
        .layer(cors)
}