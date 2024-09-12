require("dotenv").config();
const { DB_TYPE } = process.env;
let db = null;

switch (DB_TYPE) {
    case "file":
        db = require("./file/orm");
        break;
    default:
        db = require("./file/orm");
}

module.exports = { db };