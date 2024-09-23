const test = require("node:test");
const assert = require("node:assert");
const app = require(process.cwd() + "/App");

test("POST /api/contact/create/", async t => {
    const response = await app.inject({
        method: "POST",
        url: "/api/contact/create/",
        payload: {
            first_name: "John",
            last_name: "Doe",
            company_name: "ArCaptcha",
            phone_number: "9121234567",
            job_position: "Software developer",
            description: "",
        }
    })
    assert.strictEqual(response.statusCode, 201);
    const body = response.json();
    assert.notEqual(body.id, undefined);
})