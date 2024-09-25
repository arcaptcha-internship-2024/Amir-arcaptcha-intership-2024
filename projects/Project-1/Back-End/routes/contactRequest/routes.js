const { createRequestSchema, fetchContactRequestSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createRequestSchema);
    fastify.get("all/", fetchContactRequestSchema);
    done();
}

module.exports = Routes;