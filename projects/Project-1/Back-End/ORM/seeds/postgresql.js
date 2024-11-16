const pool = require("../postgresql/db");

const seed = {
    username: "admin",
    password: "$2a$10$sN4joBPnPejtKeCrlOH2deqkaiw6AgCcZhfa3Ay6Z0tXvi1axOVR6",
    role: "superuser"
}

const appendSeed = async () => {
    try {
        await pool.query("INSERT INTO admin (username, password, role) VALUES ($1, $2, $3);", [seed.username, seed.password, seed.role]);
    } catch (err) {
        console.log("Failed to append seed to database with error: " + err);
    }
}

module.exports = appendSeed;