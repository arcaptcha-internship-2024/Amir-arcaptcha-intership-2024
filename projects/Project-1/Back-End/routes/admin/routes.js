const { adminLoginSchema, allUserSchema, createNewAdminSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.decorateRequest("fastify", fastify);
    fastify.post("login/", adminLoginSchema);
    fastify.get("all/", allUserSchema);
    fastify.post("create/", createNewAdminSchema);
    done();
}

module.exports = Routes;