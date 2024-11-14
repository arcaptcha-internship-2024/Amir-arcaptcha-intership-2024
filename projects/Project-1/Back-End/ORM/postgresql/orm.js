const { createContactRequest, getAllContactRequests, getContactRequest, updateContactRequest, deleteContactRequest } = require("./contactRequest/manager");
const { getAllAdmins, getAdmin } = require("./admin/manager");

module.exports = {
    admin: {
        all: getAllAdmins,
        get: getAdmin
    },
    contactRequest: {
        create: createContactRequest,
        all: getAllContactRequests,
        get: getContactRequest,
        update: updateContactRequest,
        delete: deleteContactRequest
    }
}