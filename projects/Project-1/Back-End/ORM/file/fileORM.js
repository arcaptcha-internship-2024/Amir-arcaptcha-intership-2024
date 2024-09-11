const { getUserTable, createUser } = require("./methods/usersTable")

const fileORM = {
    users: {
        table: getUserTable,
        add: createUser,
    }
}

module.exports = fileORM;