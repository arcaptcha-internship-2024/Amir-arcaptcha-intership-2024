const tap = require("tap");


const contactRequestComments = tap.mockRequire(process.cwd() + "/ORM/file/contactRequestComments/manager", {
    [process.cwd() + "/ORM/file/contactRequest/manager"]: { isContactRequestExists: async (id) => true },
    [process.cwd() + "/ORM/file/admin/manager"]: { isObjectExists: async (username) => true, getAdmin: async (username) => ({ id: 1 }) }
});

tap.test("Create Contact Request object in file database", async (t) => {
    const fakeData = {
        message: "test",
        admin_username: "test_admin",
        contact_request_id: 1
    };

    const response = await contactRequestComments.createComment(fakeData);
    t.equal(response.message, fakeData.message);
    t.equal(response.admin_id, fakeData.admin_id);
    t.equal(response.contact_request_id, fakeData.contact_request_id);
    t.match(response.id, String)
});

