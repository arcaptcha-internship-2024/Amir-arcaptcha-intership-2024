require("dotenv").config();
const Fastify = require("fastify");

const buildFastify = () => {
    const fastify = Fastify({ logger: true });
    fastify.ready();
    return fastify;
}

module.exports = {
    buildFastify,
};