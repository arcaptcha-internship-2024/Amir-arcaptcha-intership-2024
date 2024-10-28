const { getContactRequestTable, createContactRequest, deleteContactRequest } = require("./contactRequest/manager");
const { createAdmin, getAdminTable, isObjectExists, getAdmin } = require("./admin/manager");


module.exports = {
    admin: {
        all: getAdminTable,
        get: getAdmin,
        create: createAdmin,
        exists: isObjectExists,
    },
    contactRequest: {
        all: getContactRequestTable,
        create: createContactRequest,
        delete: deleteContactRequest
    }
}