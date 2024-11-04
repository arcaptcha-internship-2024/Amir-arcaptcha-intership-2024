const { adminLoginSchema, allUserSchema, createNewAdminSchema, logoutSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.decorateRequest("fastify", fastify);
    fastify.post("login/", adminLoginSchema);
    fastify.get("all/", allUserSchema);
    fastify.post("create/", createNewAdminSchema);
    fastify.get("logout/", logoutSchema);
    done();
}

module.exports = Routes;