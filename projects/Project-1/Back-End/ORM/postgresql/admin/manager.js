const pool = require("../db");
const { hashUserPassword, isAdminRoleValid } = require("../../utils/main")

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

const createAdmin = async (username = "", password = "", role = "sale-manager") => {
    if (!isAdminRoleValid(role, ['superuser', 'sale-manager'])) {
        throw Error("Role is not valid");
    }
    const hashedPassword = await hashUserPassword(password);
    try {
        const res = await pool.query(
            `INSERT INTO admin (username, password, role) VALUES ($1, $2, $3) RETURNING *;`,
            [username, hashedPassword, role]
        )
        console.log(res.rows)
        return res.rows[0];
    } catch (err) {
        console.log("Failed to create admin user with error: " + err);
    }
    return {};
}


module.exports = {
    getAllAdmins,
    getAdmin,
    createAdmin
}