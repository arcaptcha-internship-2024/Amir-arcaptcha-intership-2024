const { v4: uuidv4 } = require("uuid");
const { getDB, saveDB } = require("../core");

const getUsersTable = async () => {
    let { users } = await getDB();
    return users;
}

const updateUsersTable = async (usersTable) => {
    let db = await getDB();
    db.users = usersTable;
    await saveDB(db);
}

const createUser = async (first_name, last_name, phone_number, company_name, job_position, description) => {
    let table = await getUsersTable();
    const userObj = {
        id: uuidv4(),
        first_name,
        last_name,
        phone_number,
        job_position,
        company_name,
        description
    }
    table.push(userObj);
    await updateUsersTable(table);
    return userObj;
}

module.exports = {
    getUsersTable,
    createUser,
}