require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const cors = require('@fastify/cors');
fastify.register(require("@fastify/cookie"), {
    secret: "supersecret",
    hook: "onRequest",

});
fastify.register(require("./routes/contactRequest/routes"), { prefix: "api/contact/" });
fastify.register(require("./routes/admin/routes"), { prefix: "api/admin/" });
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
    cookie: {
        cookieName: "token",
    },
    sign: {
        expiresIn: '1d'
    }
})

fastify.register(cors, {
    origin: 'http://localhost:5173',
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