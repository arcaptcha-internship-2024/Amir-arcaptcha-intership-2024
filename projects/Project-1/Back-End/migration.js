require("dotenv").config();
const DB_TYPE = process.env.DB_TYPE;
const fileMigrationSeed = require("./ORM/seeds/file");
const postgresMigrationSeed = require("./ORM/postgresql");

switch (DB_TYPE) {
    case "file":
        fileMigrationSeed();
        break
    case "postgres":
        postgresMigrationSeed();
        break
    default:
        fileMigrationSeed();
}