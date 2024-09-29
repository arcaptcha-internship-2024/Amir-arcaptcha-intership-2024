require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const cors = require('@fastify/cors');
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

fastify.listen({ host: SERVER_HOST, port: SERVER_PORT }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
module.exports = fastify;