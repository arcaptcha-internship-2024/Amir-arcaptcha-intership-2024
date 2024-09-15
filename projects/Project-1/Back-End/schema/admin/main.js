const { adminLoginController } = require("../../controllers/admin/controllers.js")

const adminLoginSchema = {
    schema: {
        body: {
            type: "object",
            required: ["username", "password"],
            properties: {
                username: { type: "string" },
                password: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    token: { type: "string" }
                }
            }
        },
        401: {
            type: "object",
            properties: {
                error: { type: "string" }
            }
        }
    },
    handler: adminLoginController
}

module.exports = {
    adminLoginSchema,
}