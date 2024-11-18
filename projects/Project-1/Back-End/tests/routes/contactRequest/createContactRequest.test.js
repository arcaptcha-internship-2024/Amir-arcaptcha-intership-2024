const tap = require("tap");
const { buildFastify } = require(process.cwd() + "/App.js");

tap.test("POST /api/contact/create/", async (t) => {
    const fastify = buildFastify();
    t.plan(2);
    t.teardown(() => fastify.close());
    const response = await fastify.inject({
        method: "POST",
        url: "/api/contact/create/",
        body: {
            first_name: "test",
            last_name: "test",
            company_name: "test",
            job_position: "test",
            phone_number: "test",
            description: "test",
            arcaptcha_token: "000000000000000000000000000000"
        }
    })
    t.equal(response.statusCode, 201);
    t.match(JSON.parse(response.body), { id: String });
})
