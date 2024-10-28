const { createRequestController, fetchContactRequestsController, adminCreateContactRequestController, adminDeleteContactRequestController } = require("../../controllers/contactRequest/controllers");
const { jwtAuthenticatePreValidationHook, superUserPermissonRequiredHook } = require(process.cwd() + "/utils/admin/authentication.js");

const adminContactRequestSchema = {
    type: "object",
    required: ["first_name", "last_name", "phone_number", "company_name", "job_position", "description", "status", "admin_message"],
    properties: {
        id: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        phone_number: { type: "string" },
        company_name: { type: "string" },
        job_position: { type: "string" },
        description: { type: "string" },
        status: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        admin_message: { type: "string" },
    }
}

const createRequestSchema = {
    schema: {
        body: {
            type: "object",
            required: ['first_name', 'last_name', 'company_name', 'job_position', 'phone_number', 'description', 'arcaptcha_token'],
            properties: {
                first_name: { type: "string" },
                last_name: { type: "string" },
                company_name: { type: "string" },
                phone_number: { type: "string" },
                job_position: { type: "string" },
                description: { type: "string" },
                arcaptcha_token: { type: "string" }
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "string" }
                }
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
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
                items: adminContactRequestSchema
            }
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook,
    ],
    handler: fetchContactRequestsController,
}

const adminCreateRequestSchema = {
    schema: {
        body: adminContactRequestSchema,
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook
    ],
    handler: adminCreateContactRequestController
}

const adminDeleteRequestSchema = {
    schema: {
        params: {
            type: "object",
            properties: {
                id: { type: "string" }
            },
            required: ['id']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    },
    preValidation: [
        jwtAuthenticatePreValidationHook,
        superUserPermissonRequiredHook
    ],
    handler: adminDeleteContactRequestController
}

module.exports = {
    createRequestSchema,
    fetchContactRequestSchema,
    adminCreateRequestSchema,
    adminDeleteRequestSchema
}