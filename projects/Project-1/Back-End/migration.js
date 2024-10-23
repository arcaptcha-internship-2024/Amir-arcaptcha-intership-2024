const DB_TYPE = process.env.DB_TYPE;
const fs = require("fs");
const dbFilePath = "./db/db.json";
const seed = {
    "admin": [
        {
            "id": 1,
            "username": "admin",
            "password": "$2a$10$sN4joBPnPejtKeCrlOH2deqkaiw6AgCcZhfa3Ay6Z0tXvi1axOVR6",
            "role": "superuser"
        }
    ],
    "contactRequest": []
}

if (DB_TYPE !== "file") { process.exit(0) }

const checkAdminExists = async (username = "admin") => {
    let flag = false;
    await fs.readFile(dbFilePath, (error, data) => {
        if (error) throw error;
        const db = JSON.parse(data);
        if (Object.keys(db).includes("admin")) {
            if (db.admin.find(admin => admin.username === "admin")) {
                flag = true
            }
        }
    })
    return flag;
}
const appendSeed = async () => {
    fs.open(dbFilePath, 'w', function (error, file) {
        if (error) throw error;
    })
    if (! await checkAdminExists()) {
        fs.writeFile(dbFilePath, JSON.stringify(seed), function (error, file) {
            if (error) throw error;
        })
    }
}
appendSeed();