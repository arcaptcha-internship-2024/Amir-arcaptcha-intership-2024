const { getUsersTable, createUser } = require("./users/manager");

module.exports = {
    users: {
        table: getUsersTable,
        add: createUser,
    }
}