require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const cors = require('@fastify/cors');
fastify.register(require("fastify-cookie"));
fastify.register(require("./routes/contactRequest/routes"), { prefix: "api/contact/" });
fastify.register(require("./routes/admin/routes"), { prefix: "api/admin/" });
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
})

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

const { SERVER_HOST, SERVER_PORT } = process.env;

fastify.listen({ host: SERVER_HOST || '0.0.0.0', port: SERVER_PORT || 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
module.exports = fastify;