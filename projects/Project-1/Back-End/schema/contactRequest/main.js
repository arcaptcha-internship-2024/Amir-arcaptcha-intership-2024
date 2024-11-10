const { createRequestController, fetchContactRequestsController, adminCreateContactRequestController, adminDeleteContactRequestController, adminUpdateContactRequestController } = require("../../controllers/contactRequest/controllers");
const { jwtAuthenticatePreValidationHook, superUserPermissonRequiredHook, captchaVerificationHook } = require(process.cwd() + "/utils/admin/authentication.js");

const adminContactRequestSchema = {
    description: "Schema for creating contact request object by admin user",
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
        description: "Create contact request endpoint for anonymous users",
        tags: ["contact"],
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
    preValidation: [
        captchaVerificationHook
    ],
    handler: createRequestController,
}

const fetchContactRequestSchema = {
    schema: {
        description: "Fetch Contact Request objects",
        tags: ["contact"],
        query: {
            type: "object",
            properties: {
                q: { type: "string" },
                page: { type: "number" },
                limit: { type: "number" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    previous: {
                        type: "object",
                        properties: {
                            has_previous: { type: "boolean" },
                            previous_page: { type: "integer" }
                        }
                    },
                    contact_requests: {
                        type: "array",
                        items: adminContactRequestSchema
                    },
                    next: {
                        type: "object",
                        properties: {
                            has_next: { type: "boolean" },
                            next_page: { type: "integer" }
                        }
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

const adminCreateRequestSchema = {
    schema: {
        description: "Create Contact Request object by admin users",
        tags: ["contact"],
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
        description: "Delete Contact Request object by admin",
        tags: ["contact"],
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

const adminUpdateRequestSchema = {
    schema: {
        description: "Update Contact Request object",
        tags: ["contact"],
        body: adminContactRequestSchema,
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },

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
        jwtAuthenticatePreValidationHook
    ],
    handler: adminUpdateContactRequestController
}

module.exports = {
    createRequestSchema,
    fetchContactRequestSchema,
    adminCreateRequestSchema,
    adminDeleteRequestSchema,
    adminUpdateRequestSchema
}