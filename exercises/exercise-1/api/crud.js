let http = require("http");
let url = require("url");

http.createServer((request, response) => {
    let urlPath = url.parse(request.url, true);

    switch (request.method) {
        case "GET":
            switch (urlPath.pathname) {
                case "/api/get/":
                    retrieveUserAPIView(urlPath, response);
                    break;
            }
            break;
        case "POST":
            switch (urlPath.pathname) {
                case "/api/create/":
                    createUserAPIView(request, response);
                    break;
            }
            break;
        case "PUT":
            switch (urlPath.pathname) {
                case "/api/update/":
                    updateUserAPIView(request, response);
                    break;
            }
            break;
        case "DELETE":
            switch (urlPath.pathname) {
                case "/api/delete/":
                    deleteUserAPIView(request, response);
                    break;
            }
            break;
        default:
            HTTP404Response(response);
    }
}).listen(8000)

const responseMaker = (response, status_code, response_body) => {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = status_code;
    response.write(JSON.stringify(response_body));
    response.end();
}

const HTTP404Response = (response) => {
    response.statusCode = 404;
    response.end();
}

const validateRequestData = (requestDataObject, requiredKeysArray) => {
    return requiredKeysArray.every(key => key in requestDataObject);
}

const retrieveUserAPIView = (urlPath, response) => {
    let urlQueryParams = urlPath.query;
    let requiredKeys = ['user_id'];
    let user_id = validateRequestData(urlQueryParams, requiredKeys) ? urlQueryParams['user_id'] : null;
    if (user_id) {
        let user = getUser(user_id);
        user ? responseMaker(response, 200, user) : responseMaker(response, 200, { 'user': null })
    } else {
        responseMaker(response, 400, { 'error': 'You have to set user_id in url' })
    }
}

const createUserAPIView = (request, response) => {
    let requestData = "";
    let requiredKeys = ['first_name', 'last_name', 'age'];
    request.on("data", (chunk) => {
        requestData += chunk.toString();
    })
    request.on("end", () => {
        requestData = JSON.parse(requestData);
        let requestDataIsValid = validateRequestData(requestData, requiredKeys);
        requestDataIsValid = requiredKeys.every(key => String(requestData[key]).length !== 0);
        if (requestDataIsValid) {
            let user = addUser(requestData['first_name'], requestData['last_name'], requestData['age']);
            responseMaker(response, 201, { 'message': 'Object created', user: user })
        } else {
            responseMaker(response, 400, { 'error': 'Data Is not Valid' })
        }
    })
}

const updateUserAPIView = (request, response) => {
    let requestData = "";
    let requiredKeys = ["id", 'first_name', 'last_name', 'age'];
    request.on("data", (chunk) => {
        requestData += chunk.toString();
    })
    request.on("end", () => {
        requestData = JSON.parse(requestData);
        let requestDataIsValid = validateRequestData(requestData, requiredKeys);
        if (requestDataIsValid) {
            let user = updateUser(requestData['id'], requestData['first_name'], requestData['last_name'], requestData['age']);
            user ? responseMaker(response, 200, { 'message': 'Object Updated', user: user }) : responseMaker(response, 400, { 'error': 'User not found', user: user });
        } else {
            responseMaker(response, 400, { 'error': 'Data is not valid' })
        }
    })
}

const deleteUserAPIView = (request, response) => {
    let requestData = "";
    let requiredKeys = ["id"];
    request.on("data", (chunk) => {
        requestData += chunk.toString();
    })
    request.on("end", () => {
        requestData = JSON.parse(requestData);
        let requestDataIsValid = validateRequestData(requestData, requiredKeys);
        if (requestDataIsValid) {
            let user = deleteUser(requestData['id']);
            user ? responseMaker(response, 200, { 'message': 'Object Deleted' }) : responseMaker(response, 400, { 'error': 'User not found' });
        } else {
            responseMaker(response, 400, { 'error': 'User ID must have been set' })
        }
    })
}

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