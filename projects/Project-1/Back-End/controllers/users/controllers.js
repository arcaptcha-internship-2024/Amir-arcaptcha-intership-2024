const { db } = require("../../ORM/main");

const userInformationController = async (request, response) => {
    let { first_name, last_name, phone_number, company_name, job_position, description } = request.body;
    response.code(201).send({ id: userID });
}
module.exports = {
    userInformationController,
}