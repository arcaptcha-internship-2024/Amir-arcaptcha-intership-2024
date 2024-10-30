const { v4: uuidv4 } = require("uuid");
const { getDB, updateDB } = require("../core");

const getContactRequestTable = async () => {
    let { contactRequest } = await getDB();
    return contactRequest;
}

const createContactRequest = async (first_name, last_name, phone_number, company_name, job_position, description, status = "not-checked", admin_message = "") => {
    let table = await getContactRequestTable();
    const requestObj = {
        id: uuidv4(),
        first_name,
        last_name,
        phone_number,
        job_position,
        company_name,
        description,
        status,
        admin_message,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    table.push(requestObj);
    await updateDB("contactRequest", table);
    return requestObj;
}

const deleteContactRequest = async (id) => {
    let table = await getContactRequestTable();

    table = table.filter(obj => obj.id !== id);
    await updateDB("contactRequest", table);
}

const isContactRequestExists = async (id) => {
    let table = await getContactRequestTable();
    return table.some(obj => obj.id === id);
}

const updateContactRequest = async ({ id, first_name, last_name, phone_number, job_position, company_name, description, admin_message, status }) => {
    if (!await isContactRequestExists(id)) {
        throw "Error: Contact request object doesn't exists";
    }
    let table = await getContactRequestTable();
    let obj = table.find(obj => obj.id === id);
    let objIndex = table.findIndex(obj => obj.id === id);
    obj = {
        ...obj,
        id,
        first_name,
        last_name,
        company_name,
        phone_number,
        job_position,
        description,
        admin_message,
        status,
        updated_at: new Date().toISOString()
    }
    table[objIndex] = obj;
    await updateDB("contactRequest", table);
    return obj;
}

module.exports = {
    getContactRequestTable,
    createContactRequest,
    deleteContactRequest,
    isContactRequestExists,
    updateContactRequest
}