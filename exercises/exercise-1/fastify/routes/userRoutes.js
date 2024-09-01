const { getUser, addUser, updateUser, deleteUser } = require("../controllers/userControllers");

const errorSchema = {
    type: "object",
    properties: {
        "user": { type: "null" }
    }
}

const userSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        age: { type: "integer" },
    }
}

const getUserOpt = {
    schema: {
        response: {
            200: userSchema,
            404: errorSchema,
        }
    },
    handler: getUser
}

const addUserOpt = {
    schema: {
        body: {
            type: "object",
            required: ['first_name', 'last_name', 'age'],
            properties: {
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                age: { type: 'integer' },
            }
        },
        response: {
            201: userSchema
        }
    },
    handler: addUser
}


const updateUserOpt = {
    schema: {
        body: {
            type: "object",
            required: ['id'],
            properties: {
                id: { type: "integer" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                age: { type: "integer" }
            }
        },
        response: {
            200: userSchema,
            404: errorSchema
        }
    },
    handler: updateUser
}

const deleteUserOpt = {
    schema: {
        body: {
            type: "object",
            required: ['id'],
            properties: {
                id: { type: "integer" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    status: { type: "string" }
                }
            }
        }
    },
    handler: deleteUser
}

const userRoutes = (fastify, option, done) => {
    fastify.get("/api/get/:id", getUserOpt);
    fastify.post("/api/create/", addUserOpt);
    fastify.put("/api/update/", updateUserOpt);
    fastify.delete("/api/delete/", deleteUserOpt);
    done();
}

module.exports = userRoutes;