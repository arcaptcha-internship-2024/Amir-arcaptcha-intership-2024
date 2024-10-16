const { db } = require("../../ORM/main");
const { validateCaptchaToken } = require(process.cwd() + "/utils/captcha/main.js");

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
    const conactRequests = await db.contactRequest.all();
    return response.send(conactRequests);
}

module.exports = {
    createRequestController,
    fetchContactRequestsController,
}