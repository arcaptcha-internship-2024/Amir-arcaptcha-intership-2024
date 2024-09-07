const { userInformationController } = require("../controllers/users");
const userInformationOpt = {
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
    handler: userInformationController,
}

const Routes = (fastify, option, done) => {
    fastify.post("/api/user-information/", userInformationOpt)
    done();
}

module.exports = Routes;