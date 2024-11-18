require("dotenv").config();
const Fastify = require("fastify");
const cors = require('@fastify/cors');

const buildFastify = () => {
    const fastify = Fastify({ logger: true });
    fastify.ready();
    return fastify;
}

module.exports = {
    buildFastify,
};