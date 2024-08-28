let users = []

const getUser = (user_id) => {
    user_id = parseInt(user_id);
    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] === user_id) {
            return users[i];
        }
    }
    return null;
}

const addUser = (first_name, last_name, age) => {
    age = parseInt(age);
    if (age < 0 || age > 120) {
        return { "error": "User age should be between 0 and 120" }
    }

    let newUserData = {
        "id": users.length + 1, first_name, last_name, age
    }
    users.push(newUserData);
    return newUserData;
}

const deleteUser = (user_id) => {
    user_id = parseInt(user_id);
    for (let i = 0; i < users.length; i++) {
        if (users[i]["id"] === user_id) {
            // Remove user with specified index from users array
            users = users.filter((user, index) => index !== i);
            return true;
        }
    }
    return false;
}

const updateUser = (user_id, first_name = null, last_name = null, age = null) => {
    // Update user data with given user_id
    // Note: passing every user params **except user_id** is not necessary.
    // Return: If user with given user_id exist, 
    // user object values will update with given parameters and then return the updated user object. Otherwise return null

    user_id = parseInt(user_id);
    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] === user_id) {
            let user = users[i];
            // Set previous values for fields if they are not passed as a given parameter
            user["first_name"] = first_name ? first_name : user["first_name"];
            user["last_name"] = last_name ? last_name : user["last_name"];
            user["age"] = age ? age : user["age"];
            users[i] = user;
            return user;
        }
    }
    return null;
}

let http = require("http");
let url = require("url");

const responseMaker = (response, status_code, response_body) => {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = status_code;
    response.write(JSON.stringify(response_body));
    response.end();
}

http.createServer((request, response) => {
    let urlPath = url.parse(request.url, true);
    if (urlPath.pathname === "/api/create/" && request.method === "POST") {
        let data = "";
        let requiredKeys = ['first_name', 'last_name', 'age'];
        request.on("data", (chunk) => {
            data += chunk.toString();
        })
        request.on("end", () => {
            data = JSON.parse(data);
            if (!requiredKeys.every(key => key in data)) {
                responseMaker(response, 400, { 'error': 'JSON is not valid' })
            } else if (requiredKeys.filter(key => key !== "age").some(key => String(data[key]).length === 0)) {
                responseMaker(response, 400, { 'error': 'First and last name are required' })
            } else {
                let user = addUser(data['first_name'], data['last_name'], data['age']);
                responseMaker(response, 201, { 'message': 'Object created', user: user })
            }
        })
    } else if (urlPath.pathname === "/api/get/" && request.method === "GET") {
        let data = urlPath.query;
        let requiredKeys = ['user_id'];
        if (!requiredKeys.every(key => key in data)) {
            responseMaker(response, 400, { 'error': 'You have to set user_id in url' })
        } else {
            let user = getUser(data['user_id']);
            user ? responseMaker(response, 200, user) : responseMaker(response, 200, { 'user': null })
        }
    } else if (urlPath.pathname === "/api/update/" && request.method === "PUT") {
        let data = "";
        let requiredKeys = ["id", 'first_name', 'last_name', 'age'];
        request.on("data", (chunk) => {
            data += chunk.toString();
        })
        request.on("end", () => {
            data = JSON.parse(data);
            if (!requiredKeys.filter(key => key === "id").every(key => key in data)) {
                responseMaker(response, 400, { 'error': 'User ID must have been set' })
            } else if (requiredKeys.filter(key => key !== "id" && key !== "age").some(key => String(data[key]).length === 0)) {
                responseMaker(response, 400, { 'error': 'First and last name are required' })
            } else {
                requiredKeys.forEach(key => data[key] ? data[key] : null);
                let user = updateUser(data['id'], data['first_name'], data['last_name'], data['age']);
                user ? responseMaker(response, 200, { 'message': 'Object Updated', user: user }) : responseMaker(response, 400, { 'error': 'User not found', user: user });
            }
        })
    } else if (urlPath.pathname === "/api/delete/" && request.method === "DELETE") {
        let data = "";
        let requiredKeys = ["id"];
        request.on("data", (chunk) => {
            data += chunk.toString();
        })
        request.on("end", () => {
            data = JSON.parse(data);
            if (!requiredKeys.every(key => key in data)) {
                responseMaker(response, 400, { 'error': 'User ID must have been set' })
            } else {
                let user = deleteUser(data['id']);
                user ? responseMaker(response, 200, { 'message': 'Object Deleted' }) : responseMaker(response, 400, { 'error': 'User not found' });
            }
        })
    }
}).listen(8000)
