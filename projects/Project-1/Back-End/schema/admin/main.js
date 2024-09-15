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
                    login: { type: "boolean" }
                }
            }
        },
        404: {
            type: "object",
            properties: {
                login: { type: "boolean" }
            }
        }
    },
    handler: adminLoginController
}

module.exports = {
    adminLoginSchema,
}