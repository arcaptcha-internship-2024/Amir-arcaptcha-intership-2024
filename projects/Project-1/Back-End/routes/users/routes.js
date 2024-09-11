const userInformationOpt = require("../schema/users/userInformationOpt");

const Routes = (fastify, option, done) => {
    fastify.post("/api/user-information/", userInformationOpt);
    done();
}

module.exports = Routes;