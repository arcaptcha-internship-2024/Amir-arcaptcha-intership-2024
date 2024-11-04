const { adminLoginController, usersListController, createNewAdminController, logoutController } = require(process.cwd() + "/controllers/admin/controllers.js");
const { jwtAuthenticatePreValidationHook, captchaVerificationHook } = require(process.cwd() + "/utils/admin/authentication.js");

const errorResponseSchema = {
    type: "object",
    properties: {
        error: { type: "string" }
    }
}

const messageResponseSchema = {
    type: "object",
    properties: {
        message: { type: "string" }
    }
}

const adminLoginSchema = {
    schema: {
        body: {
            type: "object",
            required: ["username", "password", "arcaptcha_token"],
            properties: {
                username: { type: "string" },
                password: { type: "string" },
                arcaptcha_token: { type: "string" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    user: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            username: { type: "string" },
                            role: { type: "string" },
                        }
                    }
                }
            },
            400: errorResponseSchema,
            401: errorResponseSchema
        },
    },
    preValidation: [
        captchaVerificationHook
    ],
    handler: adminLoginController
}

const allUserSchema = {
    schema: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        username: { type: "string" },
                        role: { type: "string" }
                    }
                }
            },
            400: errorResponseSchema,
            401: errorResponseSchema
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook
    ],
    handler: usersListController
}

const createNewAdminSchema = {
    schema: {
        body: {
            type: "object",
            properties: {
                username: { type: "string" },
                password: { type: "string" },
                role: { type: "string" }
            }
        },
        response: {
            201: messageResponseSchema,
            400: messageResponseSchema,
            409: messageResponseSchema,
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook
    ],
    handler: createNewAdminController,
}

const logoutSchema = {
    handler: logoutController
}

module.exports = {
    adminLoginSchema,
    allUserSchema,
    createNewAdminSchema,
    logoutSchema
}