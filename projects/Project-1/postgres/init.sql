CREATE TABLE IF NOT EXISTS contactRequest (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    phone_number VARCHAR(15),
    job_position VARCHAR(50),
    company_name VARCHAR(100),
    status VARCHAR(20),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'sale_manager'
);

CREATE TABLE IF NOT EXISTS contactRequestComments (
    id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL,
    contact_request_id INT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admin(id),
    CONSTRAINT fk_contact_request FOREIGN KEY (contact_request_id) REFERENCES contactRequest(id)
);
