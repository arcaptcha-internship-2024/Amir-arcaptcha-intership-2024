require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const projectRootPath = process.cwd();
let dbFilePATH = '';

if (process.env.NODE_ENV === "test") {
    dbFilePATH = path.join(projectRootPath, "db/db.test.json");
} else {
    dbFilePATH = path.join(projectRootPath, "db/db.json");
}


const getDB = async () => {
    try {
        await fs.access(dbFilePATH);
        let db = await fs.readFile(dbFilePATH);
        db = JSON.parse(db);
        return db;
    } catch (err) {
        console.log("Failed to open db file by error: " + err);
    }
}

const saveDB = async (db) => {
    db = JSON.stringify(db);
    await fs.writeFile(dbFilePATH, db);
}

const updateDB = async (table_name, table) => {
    let db = await getDB();
    db[table_name] = table;
    await saveDB(db);
}

module.exports = {
    getDB,
    saveDB,
    updateDB
}