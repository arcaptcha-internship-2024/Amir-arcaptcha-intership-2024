const { buildFastify } = require("./App");
const { consumeDataFromQueue } = require("./utils/logger/main");

const fastify = buildFastify();
const { SERVER_HOST, SERVER_PORT } = process.env;

fastify.listen({ host: SERVER_HOST || '0.0.0.0', port: SERVER_PORT || 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    try {
        consumeDataFromQueue();
    } catch (err) {
        console.log("Failed to connect RabbitMQ");
    }
})