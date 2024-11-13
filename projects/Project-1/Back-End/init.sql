CREATE DATABASE arcaptcha;

\ c arcaptcha;

CREATE TABLE contactRequest (
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