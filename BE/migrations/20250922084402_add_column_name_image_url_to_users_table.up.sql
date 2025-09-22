-- Add up migration script here
alter table users add column name varchar(255);
alter table users add column image_url varchar(255);