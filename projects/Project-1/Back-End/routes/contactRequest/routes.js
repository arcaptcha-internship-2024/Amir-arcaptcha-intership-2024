const { retrieveContactRequestData, createRequestSchema, fetchContactRequestSchema, adminCreateRequestSchema, adminDeleteRequestSchema, adminUpdateRequestSchema, createCommentSchema, retrieveAllCommentSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.get("get/:id/", retrieveContactRequestData);
    fastify.post("create/", createRequestSchema);
    fastify.get("all/", fetchContactRequestSchema);
    fastify.post("admin/create/", adminCreateRequestSchema);
    fastify.put("admin/update/", adminUpdateRequestSchema);
    fastify.delete("admin/delete/:id/", adminDeleteRequestSchema);
    fastify.post(":id/comment/create/", createCommentSchema);
    fastify.get(":id/comment/all/", retrieveAllCommentSchema);
    done();
}

module.exports = Routes;