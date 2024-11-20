module.exports = {
    admin: {
        get: async (username) => {
            if (username === "admin") {
                return {
                    id: 1,
                    username: "admin",
                    role: "superuser"
                }
            } else if (username === "sale_manager") {
                return {
                    id: 2,
                    username: "sale_manager",
                    role: "sale-manager"
                }
            }
            return null;
        }
    },
    contactRequest: {
        create: async ({ first_name, last_name, phone_number, company_name, job_position, description }) => ({
            id: "mocked-id",
        }),
    }
}