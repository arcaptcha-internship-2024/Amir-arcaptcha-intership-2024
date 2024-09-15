const { adminLoginSchema } = require("../../schema/admin/main");

const Routes = (fastify, option, done) => {
    fastify.post("login/", adminLoginSchema);
    done();
}

module.exports = Routes;