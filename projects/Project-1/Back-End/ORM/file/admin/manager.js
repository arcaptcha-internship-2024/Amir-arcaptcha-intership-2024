const { getDB, updateDB } = require("../core");

const getAdminTable = async () => {
    const { admin } = await getDB();
    return admin;
}

const getAdmin = async (username, password) => {
    const table = await getAdminTable();
    return table.find(admin => admin.username === username & admin.password === password);
}

const createAdmin = async (username, password, role = "sales_expert",) => {
    if (isObjectExists(username)) {
        throw "Username already exists";
    }
    const table = await getAdminTable();
    const adminObj = {
        username,
        password,
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