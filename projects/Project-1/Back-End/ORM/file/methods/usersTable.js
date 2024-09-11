require("dotenv").config();
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const DBPATH = "db/db.json";

const getDBArray = async () => {
    await fs.access(DBPATH);
    let db = await fs.readFile(DBPATH);
    db = JSON.parse(db);
    return db;
}

const saveDB = async (table) => {
    let db = getDBArray;
    db.users = table;
    await fs.writeFile(DBPATH, db);
}

const getUserTable = async () => {
    let { users } = await getDBArray();
    return users;
}

const createUser = async (first_name, last_name, phone_number, company_name, job_position, description) => {
    let table = await getUserTable();
    const userID = uuidv4();   
    table.push({
        userID,
        first_name,
        last_name,
        phone_number,
        job_position,
        company_name,
        description
    })
    await saveDB(table);
}

module.exports = {
    getUserTable,
    createUser,
}