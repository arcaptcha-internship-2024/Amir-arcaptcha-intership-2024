const { adminLoginSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.decorateRequest("fastify", fastify);
    fastify.post("login/", adminLoginSchema);
    done();
}

module.exports = Routes;