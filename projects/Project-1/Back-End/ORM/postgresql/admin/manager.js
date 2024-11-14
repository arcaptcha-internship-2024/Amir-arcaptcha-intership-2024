const pool = require("../db");

const getAllAdmins = async () => {
    try {
        const res = await pool.query(`SELECT id, username, role FROM admin;`);
        return res.rows;
    } catch (err) {
        console.log("Failed to fetch all admins from db with error: " + err)
    }
    return []
}

const getAdmin = async (username = "") => {
    if (!username) {
        throw Error("Username should be included")
    }
    try {
        const res = await pool.query("SELECT id, username, role FROM admin WHERE username=$1", [username]);
        return res.rowCount === 1 ? res.rows[0] : {};
    }
    catch (err) {
        console.log("Failed to fetch admin user from db by error: " + err)
    }
    return {}
}

module.exports = {
    getAllAdmins,
    getAdmin
}