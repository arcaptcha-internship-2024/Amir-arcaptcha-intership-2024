const pool = require("../db");
const { throwExceptionIfIDNotIncluded } = require("../utils/main");

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

const getAllContactRequests = async () => {
    try {
        const res = await pool.query(`SELECT * FROM contactRequest;`);
        return res.rows;
    }
    catch (err) {
        console.log("Failed to get all contact requests with error: " + err)
    }
    return false;
}

const getContactRequest = async (id = null) => {
    throwExceptionIfIDNotIncluded(id);
    try {
        const res = await pool.query(`SELECT * FROM contactRequest WHERE id=$1`, [id])
        return res.rows.length === 1 ? res.rows[0] : null;
    }
    catch (err) {
        console.log("Failed to get contact request with error: " + err)
    }
}

const updateContactRequest = async ({ id, first_name, last_name, phone_number, job_position, company_name, description, admin_message, status }) => {
    await throwExceptionIfIDNotIncluded(id=id);
    try {
        const res = await pool.query(`
            UPDATE contactRequest 
                SET first_name=$1, last_name=$2, phone_number=$3, job_position=$4, company_name=$5, description=$6, admin_message=$7, status=$8 
                WHERE id=$9 RETURNING *
            `,
            [first_name, last_name, phone_number, job_position, company_name, description, admin_message, status, id]
        )
        return res.rows[0]
    }
    catch (err) {
        console.log("Failed to update contact request with error: " + err)
    }
}

const deleteContactRequest = async (id = null) => {
    throwExceptionIfIDNotIncluded(id);
    try {
        const res = await pool.query("DELETE FROM contactRequest WHERE id=$1", [id]);
        return res.rowCount === 1 ? true : false
    }
    catch (err) {
        console.log("Failed to delete contact request with error: " + err)
    }
}

const isContactRequestExists = async (id = null) => {
    if (!id) {
        throw Error("ID is required");
    }
    try {
        const res = await pool.query("SELECT COUNT(1) FROM contactRequest WHERE id=$1", [id]);
        return parseInt(res.rows[0].count) === 1;

    } catch (err) {
        console.log("Failed to check existence contact request object with error: " + err)
    }
    return false;

}

module.exports = {
    createContactRequest,
    getAllContactRequests,
    getContactRequest,
    updateContactRequest,
    deleteContactRequest,
    isContactRequestExists
}