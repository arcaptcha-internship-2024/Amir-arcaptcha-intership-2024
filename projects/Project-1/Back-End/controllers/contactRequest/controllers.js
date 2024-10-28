const { db } = require("../../ORM/main");
const { validateCaptchaToken } = require(process.cwd() + "/utils/captcha/main.js");
const { validateContactRequestData } = require(process.cwd() + "/utils/contactRequest/main.js");

const createRequestController = async (request, response) => {
    let { first_name, last_name, phone_number, company_name, job_position, description, arcaptcha_token } = request.body;
    let isCaptchaValid = await validateCaptchaToken(arcaptcha_token)
    if (!isCaptchaValid) {
        return response.code(400).send({ error: "Captcha is not valid" });
    };
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
    const contactRequests = await db.contactRequest.all();
    return response.send(contactRequests);
}

const adminCreateContactRequestController = async (request, response) => {
    let { status, admin_message, first_name, last_name, phone_number, company_name, job_position, description } = request.body;
    console.log(await validateContactRequestData(data = { first_name, last_name, phone_number, company_name, job_position, status }, status_neccessary = true))
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
        status = status,
        admin_message = admin_message
    )
    return response.code(201).send({ id: id });
}

const adminDeleteContactRequestController = async (request, response) => {
    let { id } = request.params;
    if (db.contactRequest.exists(id)) {
        db.contactRequest.delete(id);
        return response.code(200).send({ message: "Object deleted" });
    }
    return response.code(404).send({ message: "Object not found" })
}

module.exports = {
    createRequestController,
    fetchContactRequestsController,
    adminCreateContactRequestController,
    adminDeleteContactRequestController
}