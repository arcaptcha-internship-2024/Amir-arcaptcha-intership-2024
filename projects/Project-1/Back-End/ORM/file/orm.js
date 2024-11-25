const { getContactRequestTable, createContactRequest, deleteContactRequest, isContactRequestExists, updateContactRequest } = require("./contactRequest/manager");
const { createAdmin, getAdminTable, isObjectExists, getAdmin } = require("./admin/manager");
const { createComment } = require("./contactRequestComments/manager");

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
        delete: deleteContactRequest,
        exists: isContactRequestExists,
        update: updateContactRequest
    },
    contactRequestComments: {
        create: createComment,
    }
}