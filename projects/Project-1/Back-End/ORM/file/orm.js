const { getContactRequestTable, createContactRequest } = require("./contactRequest/manager");
const { createAdmin, getAdminTable, isObjectExists } = require("./admin/manager");


module.exports = {
    admin: {
        all: getAdminTable,
        create: createAdmin,
        exists: isObjectExists,
    },
    contactRequest: {
        all: getContactRequestTable,
        create: createContactRequest,
    }
}