const { adminLoginController, usersListController, createNewAdminController, logoutController } = require(process.cwd() + "/controllers/admin/controllers.js");
const { jwtAuthenticatePreValidationHook, captchaVerificationHook, superUserPermissonRequiredHook } = require(process.cwd() + "/utils/admin/authentication.js");

const errorResponseSchema = {
    description: "Response schema for failed request",
    type: "object",
    properties: {
        error: { type: "string" }
    }
}

const messageResponseSchema = {
    description: "Sending proper message to the request",
    type: "object",
    properties: {
        message: { type: "string" }
    }
}

const adminLoginSchema = {
    schema: {
        description: "Login endpoint",
        tags: ["admin"],
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
                description: "Successfull login response",
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
        description: "Response all admins data for superuser admin",
        tags: ["admin"],
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
        jwtAuthenticatePreValidationHook,
        superUserPermissonRequiredHook
    ],
    handler: usersListController
}

const createNewAdminSchema = {
    schema: {
        description: "Endpoint for create new admin object for superusers admin",
        tags: ["admin"],
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
        jwtAuthenticatePreValidationHook,
        superUserPermissonRequiredHook
    ],
    handler: createNewAdminController,
}

const logoutSchema = {
    description: "Logout endpoint for destroy JWT token that was set in request Cookie",
    tags: ["admin"],
    handler: logoutController
}

module.exports = {
    adminLoginSchema,
    allUserSchema,
    createNewAdminSchema,
    logoutSchema
}