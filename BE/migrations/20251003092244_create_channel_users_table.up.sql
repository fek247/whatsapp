-- Add up migration script here
CREATE TABLE IF NOT EXISTS channel_users (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels (id),
    user_id INTEGER REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);