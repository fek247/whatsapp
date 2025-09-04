use std::sync::Arc;

use axum::{
    routing::{get},
    Router,
};

use crate::{
    handler::{
        health_check_handler, websocket_handler, index
    },
    AppState,
};

pub fn create_route(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/healthcheck", get(health_check_handler))
        .route("/", get(index))
        .route("/websocket", get(websocket_handler))
        .with_state(app_state)
}