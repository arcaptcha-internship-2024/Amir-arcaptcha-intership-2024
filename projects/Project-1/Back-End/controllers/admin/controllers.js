const { db } = require("../../ORM/main");

const adminLoginController = async (request, response) => {
    const { username, password } = request.body;
    const user = await db.admin.get(username, password);
    if (user) {
        return response.send({ login: true });
    }
    return response.code(404).send({ login: false });
}

module.exports = {
    adminLoginController,
}