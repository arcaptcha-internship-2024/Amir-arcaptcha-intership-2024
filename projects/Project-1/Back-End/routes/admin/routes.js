const { adminLoginSchema, allUserSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.decorateRequest("fastify", fastify);
    fastify.post("login/", adminLoginSchema);
    fastify.get("all/", allUserSchema);
    done();
}

module.exports = Routes;