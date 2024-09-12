const fastify = require("fastify")({ logger: true });
fastify.register(require("./routes/users/routes"), { prefix: "api/users/" });

fastify.listen({ port: 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
