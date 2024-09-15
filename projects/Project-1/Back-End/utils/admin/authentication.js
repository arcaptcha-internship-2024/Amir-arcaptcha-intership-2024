const bcrypt = require("bcryptjs");

const authenticate = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

module.exports = {
    authenticate
}