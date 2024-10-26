const { createRequestSchema, fetchContactRequestSchema, adminCreateRequestSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createRequestSchema);
    fastify.get("all/", fetchContactRequestSchema);
    fastify.post("admin/create/", adminCreateRequestSchema)
    done();
}

module.exports = Routes;