module.exports = {
    admin: {
        get: async (username) => {
            let validUsername = "admin"
            return username === validUsername;
        }
    },
    contactRequest: {
        create: async ({ first_name, last_name, phone_number, company_name, job_position, description }) => ({
            id: "mocked-id",
        }),
    }
}