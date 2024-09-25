const { createRequestController, fetchContactRequestsController } = require("../../controllers/contactRequest/controllers");
const { jwtAuthenticatePreValidationHook } = require(process.cwd() + "/utils/admin/authentication.js");

const createRequestSchema = {
    schema: {
        body: {
            type: "object",
            required: ['first_name', 'last_name', 'company_name', 'job_position', 'phone_number', 'description'],
            properties: {
                first_name: { type: "string" },
                last_name: { type: "string" },
                company_name: { type: "string" },
                phone_number: { type: "string" },
                job_position: { type: "string" },
                description: { type: "string" }
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "string" }
                }
            }
        }
    },
    handler: createRequestController,
}

const fetchContactRequestSchema = {
    schema: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        first_name: { type: "string" },
                        last_name: { type: "string" },
                        phone_number: { type: "string" },
                        company_name: { type: "string" },
                        job_position: { type: "string" },
                        description: { type: "string" },
                    }
                }
            }
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook,
    ],
    handler: fetchContactRequestsController,
}

module.exports = {
    createRequestSchema,
    fetchContactRequestSchema
}