const { v4: uuidv4 } = require("uuid");
const { getDB, updateDB } = require("../core");
const { isContactRequestExists } = require("../contactRequest/manager");
const { isObjectExists: isAdminExists, getAdmin } = require("../admin/manager");

const throwErrorIfContactRequestNotExist = async (contact_request_id) => {
    if (!await isContactRequestExists(contact_request_id)) {
        throw Error("Contact request object doesn't exists");
    }
}

const throwErrorIfAdminNotExist = async (admin_username) => {
    if (! await isAdminExists(admin_username)) {
        throw Error("Admin object doesn't exists");
    }
}

const throwErrorIfAdminOrContactRequestNotExists = async (contact_request_id, admin_username) => {
    await throwErrorIfContactRequestNotExist(contact_request_id);
    await throwErrorIfAdminNotExist(admin_username);
}

const getContactRequestCommentsTable = async () => {
    let { contactRequestComments } = await getDB();
    return contactRequestComments;
}

const getAdminID = async (admin_username) => {
    await throwErrorIfAdminNotExist(admin_username)
    let admin = await getAdmin(admin_username);
    if (!admin) {
        throw Error("Admin with given username not exists")
    }
    return admin.id
}

const createComment = async ({ message, admin_username, contact_request_id }) => {
    await throwErrorIfAdminOrContactRequestNotExists(contact_request_id, admin_username);
    let admin_id = await getAdminID(admin_username);
    let table = await getContactRequestCommentsTable();
    const requestObj = {
        id: uuidv4(),
        message,
        admin_id,
        contact_request_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    table.push(requestObj);
    await updateDB("contactRequestComments", table);
    return requestObj;
}

const isCommentExists = async (id) => {
    let table = await getContactRequestCommentsTable();
    return table.some(obj => obj.id === id);
}

const updateComment = async ({ id, message, admin_username, contact_request_id }) => {
    if (!await isCommentExists(id)) {
        throw Error("Contact request comment object doesn't exists");
    }
    await throwErrorIfAdminOrContactRequestNotExists(contact_request_id, admin_username);
    let admin_id = await getAdminID(admin_username);
    let table = await getContactRequestCommentsTable();
    let obj = table.find(obj => obj.id === id);
    let objIndex = table.findIndex(obj => obj.id === id);
    obj = {
        ...obj,
        message,
        admin_id,
        contact_request_id,
        updated_at: new Date().toISOString()
    }
    table[objIndex] = obj;
    await updateDB("contactRequestComments", table);
    return obj;
}


module.exports = {
    createComment,
    isCommentExists,
    updateComment,
}