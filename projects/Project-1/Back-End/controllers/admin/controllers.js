const { db } = require(process.cwd() + "/ORM/main");
const { authenticate, setAuthTokenInCookieForRequest, destroyAuthCookie } = require(process.cwd() + "/utils/admin/authentication");
const adminLoginController = async (request, response) => {
    const { username, password } = request.body;
    const user = await db.admin.get(username);
    if (await authenticate(user, password)) {
        const token = request.fastify.jwt.sign({ id: user.id, username: username, role: user['role'] });
        await setAuthTokenInCookieForRequest(response, token);
        return response.send({ message: "User Logined successfully", user });
    }
    return response.code(401).send({ error: "Invalid Username or Password" });
}

const usersListController = async (request, response) => {
    const users = await db.admin.all();
    return response.send(users);
}

const createNewAdminController = async (request, response) => {
    const { username, password, role } = request.body;
    if (await db.admin.exists(username)) {
        return response.code(409).send({ message: "Username already taken" });
    }
    if (!(role === "admin" || role === "sale-manager")) {
        return response.code(400).send({ message: "Role doesn't exist" });
    }
    const result = await db.admin.create(username, password, role);
    if (result === username) {
        return response.code(201).send({ message: "User created successfully" });
    }
    return response.code(400).send({ message: "Failed to create user" });
}

const logoutController = async (request, response) => {
    await destroyAuthCookie(response);
    response.code(200).send()
}

module.exports = {
    adminLoginController,
    usersListController,
    createNewAdminController,
    logoutController
}