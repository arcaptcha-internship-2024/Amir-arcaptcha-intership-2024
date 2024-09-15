const { getDB, updateDB } = require("../core");

const getAdminTable = async () => {
    const { admin } = await getDB();
    return admin;
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
    getAdminTable,
    createAdmin,
    isObjectExists
}