let { users } = require("../db/usersDB");

const updateUserFromDB = (user_id, first_name = null, last_name = null, age = null) => {
    user_id = parseInt(user_id);
    let user = users.find(user => user.id === user_id);
    if (user) {
        user["first_name"] = first_name ? first_name : user["first_name"];
        user["last_name"] = last_name ? last_name : user["last_name"];
        user["age"] = age ? age : user["age"];
        let userIndex = users.findIndex(user => user.id === user_id);
        users.splice(userIndex, 1, user);
        return user;
    }
    return null;
}

const getUser = (request, response) => {
    let { id } = request.params;
    id = parseInt(id);

    let user = users.find(user => user.id === id);
    if (user) {
        response.send(user);
    } else {
        response.code(404).send({});
    }
}

const addUser = (request, response) => {
    let data = request.body;
    let newUser = {
        id: users.length + 1,
        'first_name': data['first_name'],
        'last_name': data['last_name'],
        'age': data['age']
    };
    users.push(newUser);
    response.code(201).send(newUser);
}

const updateUser = (request, response) => {
    let data = request.body;
    let updatedUser = updateUserFromDB(data.id, data.first_name, data.last_name, data.age);
    if (updatedUser) {
        response.send(updatedUser);
    } else {
        response.code(404).send({ "error": "User not found" });
    }
}

const deleteUser = (request, response) => {
    let data = request.body;
    users = users.filter(user => user.id !== data.id);
    response.send({ status: "user successfully deleted" });
}

module.exports = { getUser, addUser, updateUser, deleteUser };

