const bcrypt = require("bcryptjs")
const hashUserPassword = async (password, salt_number = 10) => {
    let hashedPassword = await bcrypt.hash(password, salt_number)
    return hashedPassword;
}

module.exports = {
    hashUserPassword,
}