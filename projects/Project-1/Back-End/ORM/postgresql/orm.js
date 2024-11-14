const { createContactRequest, getAllContactRequests, getContactRequest, updateContactRequest, deleteContactRequest } = require("./contactRequest/manager");

module.exports = {
    admin: {},
    contactRequest: {
        create: createContactRequest,
        all: getAllContactRequests,
        get: getContactRequest,
        update: updateContactRequest,
        delete: deleteContactRequest
    }
}