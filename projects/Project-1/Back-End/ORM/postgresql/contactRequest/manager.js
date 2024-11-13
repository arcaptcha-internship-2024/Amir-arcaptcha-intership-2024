const pool = require("../db");

const createContactRequest = async (first_name, last_name, phone_number, company_name, job_position, description, status = "not-checked", admin_message = "") => {
    try {
        const res = await pool.query(`
            INSERT INTO contactRequest 
                (first_name, last_name, phone_number, company_name,  job_position, description, status, admin_message) 
              VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
            [first_name, last_name, phone_number, company_name, job_position, description, status, admin_message]
        );
        return res.rows[0];
    } catch (err) {
        console.log("Failed to create contactRequest obj with error: " + err)
    }
    return false;
}

module.exports = {
    createContactRequest,
}