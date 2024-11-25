const { createRequestSchema, fetchContactRequestSchema, adminCreateRequestSchema, adminDeleteRequestSchema, adminUpdateRequestSchema, createCommentSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createRequestSchema);
    fastify.get("all/", fetchContactRequestSchema);
    fastify.post("admin/create/", adminCreateRequestSchema);
    fastify.put("admin/update/", adminUpdateRequestSchema);
    fastify.delete("admin/delete/:id/", adminDeleteRequestSchema);
    fastify.post(":id/comment/create/", createCommentSchema)
    done();
}

module.exports = Routes;