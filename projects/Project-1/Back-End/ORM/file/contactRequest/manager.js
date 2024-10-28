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
    table = table.filter(obj => obj.id === id);
    await updateDB("contactRequest", table);
}

module.exports = {
    getContactRequestTable,
    createContactRequest,
    deleteContactRequest
}