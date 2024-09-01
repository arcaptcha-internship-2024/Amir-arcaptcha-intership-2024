const { users } = require("../db/usersDB");

const getUser = (request, response) => {
    let { id } = request.params;
    id = parseInt(id);

    let user = users.find(user => user.id === id);
    if (user) {
        response.send(user);
    } else {
        response.send({});
    }
}

const addUser = (request, response) => {
    let data = request.body;
    data = JSON.parse(data);
    let requiredKeys = ['first_name', 'last_name', 'age'];
    let dataIsValid = requiredKeys.every(key => String(data[key]).length !== 0);
    if (dataIsValid) {
        let newUser = {
            id: users.length + 1,
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'age': data['age']
        }
        users.push(newUser);
        response.send(newUser);
    } else {
        response.send({ "error": "data is not valid" });
    }
}

module.exports = { getUser, addUser };
