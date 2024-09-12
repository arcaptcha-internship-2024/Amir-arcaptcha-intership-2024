const { createUserSchema } = require("../../schema/users/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createUserSchema);
    done();
}

module.exports = Routes;