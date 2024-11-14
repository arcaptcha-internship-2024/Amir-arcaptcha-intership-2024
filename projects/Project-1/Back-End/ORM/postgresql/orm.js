const { createContactRequest, getAllContactRequests, getContactRequest, updateContactRequest, deleteContactRequest } = require("./contactRequest/manager");
const { getAllAdmins, getAdmin, createAdmin } = require("./admin/manager");

module.exports = {
    admin: {
        all: getAllAdmins,
        get: getAdmin,
        create: createAdmin
    },
    contactRequest: {
        create: createContactRequest,
        all: getAllContactRequests,
        get: getContactRequest,
        update: updateContactRequest,
        delete: deleteContactRequest
    }
}