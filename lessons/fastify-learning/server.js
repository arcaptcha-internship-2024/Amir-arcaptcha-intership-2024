const fastify = require("fastify")({ "logger": true });
const ItemRoutes = require("./routes/Items");
const PORT = 8000;

fastify.register(ItemRoutes);

fastify.listen({ "port": PORT }, (error, address) => {
    if (error) throw error
})

