const { userInformationController } = require("../controllers/users");
const userInformationOpt = require("../schemas/users/userInformationOpt");

const Routes = (fastify, option, done) => {
    fastify.post("/api/user-information/", userInformationOpt)
    done();
}

module.exports = Routes;