const { createRequestSchema, fetchContactRequestSchema, adminCreateRequestSchema, adminDeleteRequestSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createRequestSchema);
    fastify.get("all/", fetchContactRequestSchema);
    fastify.post("admin/create/", adminCreateRequestSchema)
    fastify.delete("admin/delete/:id/", adminDeleteRequestSchema)
    done();
}

module.exports = Routes;