mod handler;
mod route;
mod model;
mod jwt;

use std::{collections::HashSet, sync::{Arc, Mutex}};

use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use tokio::sync::broadcast;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use dotenv::dotenv;
use route::create_route;

// Our shared state
struct AppState {
    // We require unique usernames. This tracks which usernames have been taken.
    user_set: Mutex<HashSet<String>>,
    // Channel used to send messages to all connected clients.
    tx: broadcast::Sender<String>,
    // Postgres db
    db: Pool<Postgres>,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=trace", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Set up application state for use with with_state().
    let user_set = Mutex::new(HashSet::new());
    let (tx, _rx) = broadcast::channel(100);

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE Url must be set!");
    let pool = match PgPoolOptions::new().max_connections(10).connect(&database_url).await {
        Ok(pool) => {
            println!("Connection to the database is successfully!");
            pool
        }
        Err(err) => {
            println!("🔥 Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    let app_state = Arc::new(AppState{user_set, tx, db: pool.clone()});

    let cors = CorsLayer::new().allow_origin("http://localhost:3000".parse::<axum::http::HeaderValue>().unwrap()).allow_headers(Any);

    let app = create_route(app_state, cors);
    
    let listener = tokio::net::TcpListener::bind("127.0.0.1:4000")
            .await
            .unwrap();

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}


