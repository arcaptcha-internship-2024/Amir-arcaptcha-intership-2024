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

const setAuthTokenInCookieForRequest = async (response, token) => {
    response.setCookie('token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        path: '/'
      })
}

module.exports = {
    authenticate,
    jwtAuthenticatePreValidationHook,
    setAuthTokenInCookieForRequest
}