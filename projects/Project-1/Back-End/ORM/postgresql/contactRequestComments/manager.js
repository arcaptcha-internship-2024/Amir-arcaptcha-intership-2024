const pool = require("../db");
const { adminExists, getAdmin } = require("../admin/manager");
const { isContactRequestExists } = require("../contactRequest/manager")

const throwErrorIfContactRequestNotExist = async (contact_request_id) => {
    if (!await isContactRequestExists(contact_request_id)) {
        throw Error("Contact request object doesn't exists");
    }
}

const throwErrorIfAdminNotExist = async (admin_username) => {
    if (! await adminExists(admin_username)) {
        throw Error("Admin object doesn't exists");
    }
}

const throwErrorIfAdminOrContactRequestNotExists = async (contact_request_id, admin_username) => {
    await throwErrorIfContactRequestNotExist(contact_request_id);
    await throwErrorIfAdminNotExist(admin_username);
}

const getAdminID = async (admin_username) => {
    await throwErrorIfAdminNotExist(admin_username)
    let admin = await getAdmin(admin_username);
    return admin.id
}


const createComment = async ({ message, admin_username, contact_request_id }) => {
    await throwErrorIfAdminOrContactRequestNotExists(contact_request_id, admin_username);
    let admin_id = await getAdminID(admin_username);
    try {
        const response = await pool.query(`
            INSERT INTO contactRequestComments 
            (message, admin_id, contact_request_id) VALUES
            ($1, $2, $3) RETURNING *;`,
            [message, admin_id, contact_request_id]
        );
        return response.rows[0];
    } catch (err) {
        console.log("Failed to create contactRequestComment object with error: " + err)
    }
}

const filterComments = async (contact_request_id) => {
    try {
        const response = await pool.query("SELECT id, message, created_at FROM contactRequestComments WHERE contact_request_id=$1", [contact_request_id]);
        return response.rows;
    } catch (err) {
        console.log("Failed to filter comments for contact request with error: " + err);
    }
    return [];
}

module.exports = {
    createComment,
    filterComments
}