use std::sync::Arc;

use axum::{
    middleware, routing::{get, post}, Router
};
use tower_http::cors::CorsLayer;

use crate::{
    handler::{
        health_check_handler, index, login_handler, websocket_handler
    }, jwt, AppState
};

pub fn create_route(app_state: Arc<AppState>, cors: CorsLayer) -> Router {
    Router::new()
        .route("/api/healthcheck", get(health_check_handler))
        .route(
            "/",
            get(index).layer(middleware::from_fn(jwt::auth_midldleware))
        )
        .route("/websocket", get(websocket_handler))
        .route("/login", post(login_handler))
        .with_state(app_state)
        .layer(cors)
}