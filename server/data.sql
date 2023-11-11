CREATE DATABASE todoapp;

CREATE TABLE lists (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE items (
    id VARCHAR(255) PRIMARY KEY,
    list_id VARCHAR(255),
    name VARCHAR(255),
    quantity FLOAT,
    unit VARCHAR(50),
    completed BOOLEAN,
    reference_image BYTEA
);