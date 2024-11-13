const { createContactRequest } = require("./contactRequest/manager");

module.exports = {
    admin: {},
    contactRequest: {
        create: createContactRequest
    }
}