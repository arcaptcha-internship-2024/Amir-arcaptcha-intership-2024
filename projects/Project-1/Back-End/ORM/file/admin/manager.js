const { getDB, updateDB } = require("../core");
const { hashUserPassword } = require("../../utils/main");

const getAdminTable = async () => {
    const { admin } = await getDB();
    return admin;
}

const getAdmin = async (username) => {
    const table = await getAdminTable();
    return table.find(admin => admin.username === username);
}

const createAdmin = async (username, password, role = "sale-manager",) => {
    if (isObjectExists(username)) {
        throw "Username already exists";
    }
    let hashedPassword = await hashUserPassword(password);
    const table = await getAdminTable();
    const adminObj = {
        username,
        hashedPassword,
        role
    }
    table.push(adminObj);
    await updateDB("admin", table);
    return username;
}

const isObjectExists = async (username) => {
    const table = await getAdminTable();
    return table.findIndex(admin => admin.username === username) !== -1 ? true : false;
}

module.exports = {
    getAdmin,
    getAdminTable,
    createAdmin,
    isObjectExists
}