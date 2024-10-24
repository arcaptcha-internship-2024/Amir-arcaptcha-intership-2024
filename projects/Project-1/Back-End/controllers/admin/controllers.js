const { db } = require(process.cwd() + "/ORM/main");
const { authenticate, setAuthTokenInCookieForRequest } = require(process.cwd() + "/utils/admin/authentication");
const { validateCaptchaToken } = require(process.cwd() + "/utils/captcha/main")
const adminLoginController = async (request, response) => {
    const { username, password, arcaptcha_token } = request.body;
    let isCaptchaValid = await validateCaptchaToken(arcaptcha_token);
    if (!isCaptchaValid) {
        return response.code(400).send({ error: "Captcha is not valid" });
    };
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
    const { username, password, role, arcaptcha_token } = request.body;
    let isCaptchaValid = await validateCaptchaToken(arcaptcha_token);
    if (!isCaptchaValid) {
        return response.code(400).send({ error: "Captcha is not valid" });
    };
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

module.exports = {
    adminLoginController,
    usersListController,
    createNewAdminController
}