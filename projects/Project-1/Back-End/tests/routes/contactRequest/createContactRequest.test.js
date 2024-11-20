const tap = require("tap");
const { buildFastify } = require(process.cwd() + "/App.js");
const { adminCreateRequestSchema, createRequestSchema } = require(process.cwd() + "/schema/contactRequest/main.js")
const mockDb = require(process.cwd() + "/tests/mocks/DB/mockedDB.js")

const mockControllers = tap.mockRequire(process.cwd() + "/controllers/contactRequest/controllers", {
    [process.cwd() + "/ORM/main"]: { db: mockDb },
    [process.cwd() + "/utils/logger/main"]: { sendLogToQueue: async (log_message = "") => true },
});


tap.test("POST /api/contact/create/", async (t) => {
    const fastify = buildFastify();
    fastify.post("/api/contact/create/", { ...createRequestSchema, handler: mockControllers.createRequestController });
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

tap.test("POST /api/contact/admin/create/", async (t) => {
    const fastify = buildFastify();
    fastify.decorateRequest("user", {
        id: 1,
        username: "test",
        role: "superuser"
    })

    await fastify.post("/api/contact/admin/create/", {
        ...adminCreateRequestSchema,
        preValidation: [],
        handler: mockControllers.adminCreateContactRequestController
    })

    t.teardown(() => fastify.close());
    t.createMock(process.cwd() + '/ORM/main.js', { "db.contactRequest.create": () => { id: 1 } });

    const response = await fastify.inject({
        method: "POST",
        url: "/api/contact/admin/create/",
        body: {
            first_name: "test",
            last_name: "test",
            company_name: "test",
            job_position: "test",
            phone_number: "test",
            description: "test",
            admin_message: "",
            status: "not-checked"
        }
    })
    t.equal(response.statusCode, 201);
    t.match(JSON.parse(response.body), { id: String });
})