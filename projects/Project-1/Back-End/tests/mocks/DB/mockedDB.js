module.exports = {
    admin: {

    },
    contactRequest: {
        create: async ({ first_name, last_name, phone_number, company_name, job_position, description }) => ({
            id: "mocked-id",
        }),
    }
}