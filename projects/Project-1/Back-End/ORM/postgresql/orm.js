const { createContactRequest, getAllContactRequests, getContactRequest, updateContactRequest, deleteContactRequest, isContactRequestExists } = require("./contactRequest/manager");
const { getAllAdmins, getAdmin, createAdmin, adminExists, updateAdmin } = require("./admin/manager");
const { createComment, filterComments } = require("./contactRequestComments/manager");

module.exports = {
    admin: {
        all: getAllAdmins,
        get: getAdmin,
        create: createAdmin,
        update: updateAdmin,
        exists: adminExists
    },
    contactRequest: {
        create: createContactRequest,
        all: getAllContactRequests,
        get: getContactRequest,
        update: updateContactRequest,
        delete: deleteContactRequest,
        exists: isContactRequestExists
    },
    contactRequestComments: {
        create: createComment,
        filter: filterComments
    }
}