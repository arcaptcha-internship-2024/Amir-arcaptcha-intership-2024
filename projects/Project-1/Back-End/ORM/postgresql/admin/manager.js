const pool = require("../db");
const { hashUserPassword, isAdminRoleValid, isObjectEmpty } = require("../../utils/main")

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
        const res = await pool.query("SELECT id, username, password, role FROM admin WHERE username=$1", [username]);
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
        return res.rows[0];
    } catch (err) {
        console.log("Failed to create admin user with error: " + err);
    }
    return {};
}

const adminExists = async (username = "") => {
    try {
        const res = await pool.query("SELECT COUNT(1) FROM admin WHERE username=$1", [username]);
        return parseInt(res.rows[0].count) === 1;
    }
    catch (err) {
        console.log("Failed to check existence admin user with error: " + err);
    }
    return false
}

const updateAdmin = async (username = "", role = "") => {
    let admin = await getAdmin(username);
    if (isObjectEmpty(admin)) {
        throw Error("Username not exists");
    }
    admin.role = role ? role : admin.role;
    try {
        const res = await pool.query("UPDATE admin SET role=$1 WHERE username=$2", [admin.role, admin.username]);
        return res.rows[0];
    } catch (err) {
        console.log("Failed to update admin user with error: " + err);
        throw Error("Failed to update admin object");
    }
}


module.exports = {
    getAllAdmins,
    getAdmin,
    createAdmin,
    adminExists,
    updateAdmin
}