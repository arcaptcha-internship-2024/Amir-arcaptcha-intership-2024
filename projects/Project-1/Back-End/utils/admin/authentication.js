const bcrypt = require("bcryptjs");
const { isCaptchaTokenValid } = require("../captcha/main")

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
    if (request.user.role !== "superuser") {
        return response.status(403).send({ error: "Permission denied" })
    }
}

const captchaVerificationHook = async (request, response) => {
    const { arcaptcha_token } = request.body;
    const isCaptchaValid = await isCaptchaTokenValid(arcaptcha_token);
    if (!isCaptchaValid){
        return response.status(400).send({ error: "Captcha Token Is not valid" })
    }
}

const setAuthTokenInCookieForRequest = async (response, token) => {
    response.setCookie('token', token, {
        httpOnly: true,
        path: '/'
    })
}

const destroyAuthCookie = async (response) => {
    response.clearCookie("token", {
        httpOnly: true,
        path: "/"
    })    
}

module.exports = {
    authenticate,
    jwtAuthenticatePreValidationHook,
    setAuthTokenInCookieForRequest,
    superUserPermissonRequiredHook,
    captchaVerificationHook,
    destroyAuthCookie
}