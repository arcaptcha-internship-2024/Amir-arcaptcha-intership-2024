const bcrypt = require("bcryptjs")
const hashUserPassword = async (password, salt_number = 10) => {
    let hashedPassword = await bcrypt.hash(password, salt_number)
    return hashedPassword;
}

const isAdminRoleValid = (role="", expected_results = []) => {
    return expected_results.some(expectedRole => expectedRole === role);
}

module.exports = {
    hashUserPassword,
    isAdminRoleValid
}