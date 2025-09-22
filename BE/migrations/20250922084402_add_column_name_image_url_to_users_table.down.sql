-- Add down migration script here
ALTER TABLE users DROP COLUMN name;
ALTER TABLE users DROP COLUMN image_url;