require("dotenv").config();
const fastify = require("fastify")({ logger: true });
fastify.register(require("./routes/contactRequest/routes"), { prefix: "api/contact/" });
fastify.register(require("./routes/admin/routes"), { prefix: "api/admin/" });
fastify.register(require("fastify-jwt"), {
    secret: "supersecret"
})

const { SERVER_HOST, SERVER_PORT } = process.env;

fastify.listen({ host: SERVER_HOST, port: SERVER_PORT }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
module.exports = fastify;