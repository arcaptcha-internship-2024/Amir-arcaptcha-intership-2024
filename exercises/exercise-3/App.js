const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-postgres"), {
    connectionString: "postgres://root:Alimardani33@localhost:5432/fastify_exercise"
});

fastify.get("/", async (request, response) => {
    const client = await fastify.pg.query('SELECT * FROM users');
    console.log(client);
    // const { rows } = client.query();
    // console.log(rows);
    response.send(client);

})

fastify.listen({ port: 8000 }, (error, address) => {
    if (error) throw address;
})