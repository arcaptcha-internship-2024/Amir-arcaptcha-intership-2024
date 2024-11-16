const { db } = require(process.cwd() + "/ORM/main");
const { authenticate, setAuthTokenInCookieForRequest, destroyAuthCookie } = require(process.cwd() + "/utils/admin/authentication");
const { sendLogToQueue, getLastLogMessages } = require(process.cwd() + "/utils/logger/main.js");

const adminLoginController = async (request, response) => {
    const { username, password } = request.body;
    const user = await db.admin.get(username);
    try {
        if (await authenticate(user, password)) {
            const token = request.fastify.jwt.sign({ id: user.id, username: username, role: user['role'] });
            await setAuthTokenInCookieForRequest(response, token);
            return response.send({ message: "User Logined successfully", user });
        }
    } catch (err) {
        console.log(err);
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
    if (!(role === "superuser" || role === "sale-manager")) {
        return response.code(400).send({ message: "Role doesn't exist" });
    }
    const result = await db.admin.create(username, password, role);
    if (result.username === username) {
        sendLogToQueue(`${request.user.username} Created ${role} user request object with username: ${username}`);
        return response.code(201).send({ message: "User created successfully" });
    }
    return response.code(400).send({ message: "Failed to create user" });
}

const logoutController = async (request, response) => {
    await destroyAuthCookie(response);
    response.code(200).send()
}

const retrieveAdminLogController = async (request, response) => {
    let logMessages = await getLastLogMessages();
    return response.send(logMessages)
}

module.exports = {
    adminLoginController,
    usersListController,
    createNewAdminController,
    logoutController,
    retrieveAdminLogController
}