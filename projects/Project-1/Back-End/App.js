const fastify = require("fastify")({ logger: true });
fastify.register(require("./routes/users/routes"), { prefix: "api/users/" });

fastify.listen({ host: "0.0.0.0", port: 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
