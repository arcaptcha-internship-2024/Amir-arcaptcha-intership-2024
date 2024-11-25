const { v4: uuidv4 } = require("uuid");
const { getDB, updateDB } = require("../core");
const { isContactRequestExists } = require("../contactRequest/manager");
const { isObjectExists: isAdminExists, getAdmin } = require("../admin/manager");

const getContactRequestCommentsTable = async () => {
    let { contactRequestComments } = await getDB();
    return contactRequestComments;
}



const createComment = async ({ message, admin_username, contact_request_id }) => {
    if (!await isContactRequestExists(contact_request_id)) {
        throw Error("Contact request object doesn't exists");
    } else if (! await isAdminExists(admin_username)) {
        throw Error("Admin object doesn't exists");
    }
    
    let admin = await getAdmin(admin_username);
    let table = await getContactRequestCommentsTable();
    const requestObj = {
        id: uuidv4(),
        message,
        admin_id: admin.id,
        contact_request_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    table.push(requestObj);
    await updateDB("contactRequestComments", table);
    return requestObj;
}


module.exports = {
    createComment
}