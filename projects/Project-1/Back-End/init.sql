CREATE DATABASE IF NOT EXISTS arcaptcha;

\ c arcaptcha;

CREATE TABLE IF NOT EXISTS contactRequest (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    phone_number VARCHAR(15),
    job_position VARCHAR(50),
    company_name VARCHAR(100),
    status VARCHAR(20),
    description TEXT,
    admin_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS  admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'sale_manager'
);