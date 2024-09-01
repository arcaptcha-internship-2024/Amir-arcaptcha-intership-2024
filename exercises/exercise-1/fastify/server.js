const fastify = require("fastify")({ logger: true });
const userRoutes = require("./routes/userRoutes");

fastify.register(userRoutes);

fastify.listen({ port: 8000 }, (error, address) => {
    if (error) throw error;
})