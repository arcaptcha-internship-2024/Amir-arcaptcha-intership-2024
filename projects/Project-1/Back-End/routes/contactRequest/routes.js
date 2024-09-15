const { createRequestSchema } = require("../../schema/contactRequest/main");

const Routes = (fastify, option, done) => {
    fastify.post("create/", createRequestSchema);
    done();
}

module.exports = Routes;