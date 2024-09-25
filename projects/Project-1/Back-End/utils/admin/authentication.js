const bcrypt = require("bcryptjs");

const authenticate = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

const jwtAuthenticatePreValidationHook = async (request, response) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        return response.status(401).send({ error: "Access denied: UnAuthorized user" })
    }
}

module.exports = {
    authenticate,
    jwtAuthenticatePreValidationHook
}