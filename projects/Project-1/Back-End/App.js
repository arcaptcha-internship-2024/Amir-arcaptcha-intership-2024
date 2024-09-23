const fastify = require("fastify")({ logger: true });
fastify.register(require("./routes/contactRequest/routes"), { prefix: "api/contact/" });
fastify.register(require("./routes/admin/routes"), { prefix: "api/admin/" });
fastify.register(require("fastify-jwt"), {
    secret: "supersecret"
})

fastify.listen({ host: "0.0.0.0", port: 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
module.exports = fastify;