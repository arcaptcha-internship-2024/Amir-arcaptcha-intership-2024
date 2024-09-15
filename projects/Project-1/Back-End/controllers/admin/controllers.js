const { db } = require("../../ORM/main");
const { authenticate } = require("../../utils/admin/authentication")

const adminLoginController = async (request, response) => {
    const { username, password } = request.body;
    const user = await db.admin.get(username);
    if (await authenticate(user, password)) {
        return response.send({ login: true });
    }
    return response.code(404).send({ login: false });
}

module.exports = {
    adminLoginController,
}