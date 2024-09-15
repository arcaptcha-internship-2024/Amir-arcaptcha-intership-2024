const { db } = require("../../ORM/main");
const { authenticate } = require("../../utils/admin/authentication");

const adminLoginController = async (request, response) => {
    const { username, password } = request.body;
    const user = await db.admin.get(username);
    if (await authenticate(user, password)) {
        const token = request.fastify.jwt.sign({ id: user.id, username: username });
        return response.send({ token });
    }
    return response.code(401).send({ error: "Invalid Username or Password" });
}

module.exports = {
    adminLoginController,
}