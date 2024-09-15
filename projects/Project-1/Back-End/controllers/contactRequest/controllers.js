const { db } = require("../../ORM/main");

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

module.exports = {
    createRequestController,
}