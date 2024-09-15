const { v4: uuidv4 } = require("uuid");
const { getDB, saveDB } = require("../core");

const getContactRequestTable = async () => {
    let { contactRequest } = await getDB();
    return contactRequest;
}

const updateContactRequestTable = async (contactRequestTable) => {
    let db = await getDB();
    db.contactRequest = contactRequestTable;
    await saveDB(db);
}

const createContactRequest = async (first_name, last_name, phone_number, company_name, job_position, description) => {
    let table = await getContactRequestTable();
    const requestObj = {
        id: uuidv4(),
        first_name,
        last_name,
        phone_number,
        job_position,
        company_name,
        description
    }
    table.push(requestObj);
    await updateContactRequestTable(table);
    return requestObj;
}

module.exports = {
    getContactRequestTable,
    createContactRequest,
}