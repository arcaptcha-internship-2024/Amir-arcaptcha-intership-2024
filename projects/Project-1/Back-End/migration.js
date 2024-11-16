require("dotenv").config();
const DB_TYPE = process.env.DB_TYPE;
const fileMigrationSeed = require("./ORM/seeds/file");

switch (DB_TYPE) {
    case "file":
        fileMigrationSeed();
        break
    default:
        fileMigrationSeed();
}