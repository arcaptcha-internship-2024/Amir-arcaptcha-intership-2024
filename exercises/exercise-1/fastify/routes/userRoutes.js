const { getUser, addUser } = require("../controllers/userControllers");

const getUserOpt = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    age: { type: "integer" },
                }
            }
        }
    },
    handler: getUser
}

const addUserOpt = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    age: { type: "integer" },
                }
            }
        }
    },
    handler: addUser
}

const userRoutes = (fastify, option, done) => {
    fastify.get("/api/get/:id", getUserOpt);
    fastify.post("/api/create/", addUserOpt);
    done();
}

module.exports = userRoutes;