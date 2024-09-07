const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const dbPath = "./db/db.json";

const userInformationController = async (request, response) => {
    await fs.access(dbPath);
    let db = await fs.readFile(dbPath);
    db = JSON.parse(db);

    let { first_name, last_name, phone_number, company_name, job_position, description } = request.body;
    const userID = uuidv4();
    db.users.push({
        userID,
        first_name,
        last_name,
        phone_number,
        job_position,
        company_name,
        description
    })
    db = JSON.stringify(db);
    await fs.writeFile(dbPath, db,);
    response.code(201).send({ id: userID });
}
module.exports = {
    userInformationController,
}