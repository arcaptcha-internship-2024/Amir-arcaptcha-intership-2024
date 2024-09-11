require("dotenv").config();
const { DB_TYPE } = process.env;
let db = null;

switch (DB_TYPE) {
    case "file":
        db = require("./file/fileORM");
        break;
    default:
        db = require("./file/fileORM");
}

module.exports = { db };