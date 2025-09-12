use std::sync::Arc;

use axum::{
    routing::{get, post},
    Router,
};
use tower_http::cors::CorsLayer;

use crate::{
    handler::{
        health_check_handler, index, login_handler, signup_handler, websocket_handler
    },
    AppState,
};

pub fn create_route(app_state: Arc<AppState>, cors: CorsLayer) -> Router {
    Router::new()
        .route("/api/healthcheck", get(health_check_handler))
        .route("/", get(index))
        .route("/websocket", get(websocket_handler))
        .route("/login", post(login_handler))
        .route("/signup", post(signup_handler))
        .with_state(app_state)
        .layer(cors)
}