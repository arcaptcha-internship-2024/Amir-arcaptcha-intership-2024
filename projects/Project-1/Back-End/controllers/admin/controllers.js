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
        setAuthTokenInCookieForRequest(response, token);
        return response.send({ message: "User Logined successfully", user });
    }
    return response.code(401).send({ error: "Invalid Username or Password" });
}

module.exports = {
    adminLoginController,
}