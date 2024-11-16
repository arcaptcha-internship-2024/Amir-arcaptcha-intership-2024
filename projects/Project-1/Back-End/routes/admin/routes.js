const { adminLoginSchema, allUserSchema, createNewAdminSchema, logoutSchema, retrieveAdminLogSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.decorateRequest("fastify", fastify);
    fastify.post("login/", adminLoginSchema);
    fastify.get("all/", allUserSchema);
    fastify.post("create/", createNewAdminSchema);
    fastify.get("logout/", logoutSchema);
    fastify.get("logs/", retrieveAdminLogSchema)
    done();
}

module.exports = Routes;