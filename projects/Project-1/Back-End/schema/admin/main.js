const { adminLoginController } = require(process.cwd() + "/controllers/admin/controllers.js");

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
                    token: { type: "string" }
                }
            },
            400: errorResponseSchema,
            401: errorResponseSchema
        },
    },
    handler: adminLoginController
}

module.exports = {
    adminLoginSchema,
}