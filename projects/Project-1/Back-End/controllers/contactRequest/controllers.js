const { db } = require("../../ORM/main");
const { validateContactRequestData } = require(process.cwd() + "/utils/contactRequest/main.js");
const { getPaginatedResult } = require(process.cwd() + "/utils/pagination/main.js");
const { sendLogToQueue } = require(process.cwd() + "/utils/logger/main.js");

const createRequestController = async (request, response) => {
    let { first_name, last_name, phone_number, company_name, job_position, description } = request.body;
    let { id } = await db.contactRequest.create(
        first_name = first_name,
        last_name = last_name,
        phone_number = phone_number,
        company_name = company_name,
        job_position = job_position,
        description = description
    )
    response.code(201).send({ id: id });
}

const fetchContactRequestsController = async (request, response) => {
    const { q, page, limit, status } = request.query;
    let contactRequests = await db.contactRequest.all();
    let paginatedResult = getPaginatedResult(page, limit, q, status, contactRequests);
    return response.send(paginatedResult);
}

const retrieveContactRequestHandler = async (request, response) => {
    let { id } = request.params;
    let obj = await db.contactRequest.get(id);
    if (obj) {
        return response.code(200).send(obj);
    }
    return response.code(404).send({ message: "Object not found" })
}

const adminCreateContactRequestController = async (request, response) => {
    let { status, first_name, last_name, phone_number, company_name, job_position, description } = request.body;
    if (!await validateContactRequestData(data = { first_name, last_name, phone_number, company_name, job_position, status }, status_neccessary = true)) {
        return response.code(400).send({ error: "Please Complete all fields" });
    }
    let { id } = await db.contactRequest.create(
        first_name = first_name,
        last_name = last_name,
        phone_number = phone_number,
        company_name = company_name,
        job_position = job_position,
        description = description,
        status = status
    )
    sendLogToQueue(`${request.user.username} Created a contact request object with ID: ${id}`);
    return response.code(201).send({ id: id });
}

const adminDeleteContactRequestController = async (request, response) => {
    let { id } = request.params;
    if (await db.contactRequest.exists(id)) {
        db.contactRequest.delete(id);
        sendLogToQueue(`${request.user.username} deleted a contact request object with ID: ${id}`);
        return response.code(200).send({ message: "Object deleted" });
    }
    return response.code(404).send({ message: "Object not found" })
}

const adminUpdateContactRequestController = async (request, response) => {
    let { id, first_name, last_name, phone_number, company_name, job_position, description, status } = request.body;
    if (!await db.contactRequest.exists(id)) {
        return response.code(404).send({ message: "Object Not found" });
    }
    const obj = await db.contactRequest.update({ id, first_name, last_name, phone_number, company_name, job_position, description, status });
    sendLogToQueue(`${request.user.username} Updated a contact request object with ID: ${id}`);
    return response.code(200).send({ message: "Object Updated" })
}

module.exports = {
    createRequestController,
    fetchContactRequestsController,
    retrieveContactRequestHandler,
    adminCreateContactRequestController,
    adminDeleteContactRequestController,
    adminUpdateContactRequestController
}