const { createContactRequest, getAllContactRequests, getContactRequest } = require("./contactRequest/manager");

module.exports = {
    admin: {},
    contactRequest: {
        create: createContactRequest,
        all: getAllContactRequests,
        get: getContactRequest
    }
}