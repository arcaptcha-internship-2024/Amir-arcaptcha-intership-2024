const { getContactRequestTable, createContactRequest } = require("./contactRequest/manager");

module.exports = {
    contactRequest: {
        table: getContactRequestTable,
        create: createContactRequest,
    }
}