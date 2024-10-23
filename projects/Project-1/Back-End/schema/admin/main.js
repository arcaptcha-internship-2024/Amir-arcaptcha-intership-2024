const { adminLoginController, usersListController } = require(process.cwd() + "/controllers/admin/controllers.js");
const { jwtAuthenticatePreValidationHook } = require(process.cwd() + "/utils/admin/authentication.js");

const errorResponseSchema = {
    type: "object",
    properties: {
        error: { type: "string" }
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

module.exports = {
    adminLoginSchema,
    allUserSchema
}