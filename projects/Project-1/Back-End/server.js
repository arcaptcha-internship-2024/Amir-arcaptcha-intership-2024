const { buildFastify } = require("./App");
const { consumeDataFromQueue } = require("./utils/logger/main");

const fastify = buildFastify();
const { SERVER_HOST, SERVER_PORT } = process.env;

fastify.register(require('@fastify/swagger'), {
    swagger: {
        info: {
            title: 'API Documentation',
            description: 'API documentation for your Fastify application',
            version: '1.0.0'
        },
        host: `${process.env.SERVER_HOST || '0.0.0.0'}:${process.env.SERVER_PORT || 8000}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'contact', description: 'Contact related endpoints' },
            { name: 'admin', description: 'Admin related endpoints' }
        ],
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    }
});

// Register Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/doc',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
});

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
    origin: ['http://localhost:5173', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})


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