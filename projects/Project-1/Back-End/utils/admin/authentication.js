const bcrypt = require("bcryptjs");

const authenticate = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

const jwtAuthenticatePreValidationHook = async (request, response) => {
    try {
        const { token } = request.cookies;
        await request.jwtVerify({ onlyCookie: true });
    } catch (error) {
        return response.status(401).send({ error: "Access denied, UnAuthorized user" })
    }
}

const superUserPermissonRequiredHook = async (request, response) => {
    if(request.user.role !== "superuser"){
        return response.status(403).send({ error: "Permission denied" })
    }
}

const setAuthTokenInCookieForRequest = async (response, token) => {
    response.setCookie('token', token, {
        httpOnly: true,
        path: '/'
    })
}

module.exports = {
    authenticate,
    jwtAuthenticatePreValidationHook,
    setAuthTokenInCookieForRequest,
    superUserPermissonRequiredHook
}