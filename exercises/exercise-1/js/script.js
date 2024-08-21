// Users table with some existing data
let users = []

const getUser = (user_id) => {
    // Retrieve user from users table
    // Return null if users doesn't exist

    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] === user_id) {
            return users[i];
        }
    }
    return null;
}

const addUser = (first_name, last_name, age) => {
    // Add new user to users table
    // Return: user object or object with error message

    // Validate age
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
    // Delete User from users table
    // Return: bool -> return true if user founded otherwise return false

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

// CRUD By User
let addObjectButton = document.getElementById("add-new-user-button");
let firstNameInput = document.getElementById("first_name");
let lastNameInput = document.getElementById("last_name");
let ageInput = document.getElementById("age");
let tableBody = document.getElementById("table-body");

const createTableRow = (result) => {
    // This Method will get a user object as a parameter and 
    // Make a HTML row and return it

    let row = document.createElement("div");
    row.classList.add("db-table-row");
    let id_cell = document.createElement("div");
    id_cell.classList.add("db-table-cell");
    id_cell.innerText = result.id;
    let first_name_cell = document.createElement("div");
    first_name_cell.classList.add("db-table-cell");
    first_name_cell.innerText = result.first_name;
    let last_name_cell = document.createElement("div");
    last_name_cell.classList.add("db-table-cell");
    last_name_cell.innerText = result.last_name;
    let age_cell = document.createElement("div");
    age_cell.classList.add("db-table-cell");
    age_cell.innerText = result.age;
    row.appendChild(id_cell);
    row.appendChild(first_name_cell);
    row.appendChild(last_name_cell);
    row.appendChild(age_cell);
    return row
}

// Call event listener on click event
addObjectButton.addEventListener('click', () => {
    let first_name = firstNameInput.value;
    let last_name = lastNameInput.value;
    let age = ageInput.value;
    let result = addUser(first_name, last_name, age);
    if (result.error) {
        alert(result.error)
    } else {
        // Append new row to the table
        let row = createTableRow(result);
        tableBody.appendChild(row);

        // clear the inputs
        firstNameInput.value = "";
        lastNameInput.value = "";
        ageInput.value = "";
    }
})
