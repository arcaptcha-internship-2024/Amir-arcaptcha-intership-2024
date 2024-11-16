const fs = require("fs").promises;
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

const isUsernameExists = async (username = "admin") => {
    let flag = false;
    let db = await fs.readFile(dbFilePath, { encoding: 'utf8' });
    try {
        db = JSON.parse(db);
    } catch (e) {
        return flag
    }
    if (Object.keys(db).includes(username)) {
        if (db.admin.find(admin => admin.username === username)) {
            flag = true
        }
    }
    return flag;
}

const writeSeedInFile = async () => {
    await fs.writeFile(dbFilePath, JSON.stringify(seed), { encoding: "utf8" });
}
const appendSeed = async () => {
    try {
        await fs.open(dbFilePath, 'r');
        if (! await isUsernameExists()) {
            await writeSeedInFile();
        }
    }
    catch {
        await writeSeedInFile();
    }
}

module.exports = appendSeed();