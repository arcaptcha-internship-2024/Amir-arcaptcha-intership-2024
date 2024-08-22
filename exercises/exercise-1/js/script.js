// Users table with some existing data
let users = []

const getUser = (user_id) => {
    // Retrieve user from users table
    // Return null if users doesn't exist
    user_id = parseInt(user_id);
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

// CRUD By User
let addObjectButton = document.getElementById("add-new-user-button");
let firstNameInput = document.getElementById("first_name");
let lastNameInput = document.getElementById("last_name");
let ageInput = document.getElementById("age");
let userIdInput = document.getElementById("user_id_hidden");
let tableBody = document.getElementById("table-body");

const removeCellHandler = (button) => {
    let user_id = button.getAttribute("user_id");
    let row = document.getElementById(user_id);
    row.remove();
}

const updateCellHandler = (button, userIdInput) => {
    // Handler for update user on edit user data button

    let user_id = button.getAttribute("user_id");
    let user = getUser(user_id);
    if (user === null) {
        alert("User Not found");
        return;
    }
    userIdInput.value = user_id;
    firstNameInput.value = user.first_name;
    lastNameInput.value = user.last_name;
    ageInput.value = user.age;
    addObjectButton.innerText = "Update User";
}

const createTableRow = (result) => {
    // This Method will get a user object as a parameter and 
    // Make a HTML row and return it

    // Create row Element
    let row = document.createElement("div");
    row.classList.add("db-table-row");
    row.id = result.id;

    // Create cells
    let id_cell = document.createElement("div");
    id_cell.classList.add("db-table-cell");
    id_cell.innerText = result.id;
    let first_name_cell = document.createElement("div");
    first_name_cell.classList.add("db-table-cell");
    first_name_cell.classList.add("db-table-cell-lg");
    first_name_cell.innerText = result.first_name;
    first_name_cell.setAttribute("first_name", result.id);

    let last_name_cell = document.createElement("div");
    last_name_cell.classList.add("db-table-cell");
    last_name_cell.classList.add("db-table-cell-lg");
    last_name_cell.innerText = result.last_name;
    last_name_cell.setAttribute("last_name", result.id);

    let age_cell = document.createElement("div");
    age_cell.classList.add("db-table-cell");
    age_cell.innerText = result.age;
    age_cell.setAttribute("age", result.id);

    let opreration_cell = document.createElement("div");
    opreration_cell.classList.add("db-table-cell");
    opreration_cell.classList.add("db-table-cell-lg");
    opreration_cell.classList.add("operation-cell");

    // Remove Row Button
    let removeRowButtton = document.createElement("button");
    removeRowButtton.classList.add("operation-button");
    removeRowButtton.classList.add("btn-danger");
    removeRowButtton.classList.add("remove-row-button");
    removeRowButtton.setAttribute("user_id", result.id);
    removeRowButtton.innerText = "Delete";
    removeRowButtton.addEventListener("click", () => {
        removeCellHandler(removeRowButtton);
    })

    // Update Row Button
    let updateRowButtton = document.createElement("button");
    updateRowButtton.classList.add("operation-button");
    updateRowButtton.classList.add("btn-success");
    updateRowButtton.classList.add("update-row-button");
    updateRowButtton.setAttribute("user_id", result.id);
    updateRowButtton.innerText = "Edit";
    updateRowButtton.addEventListener("click", () => {
        updateCellHandler(updateRowButtton, userIdInput);
    })

    // Append Childs to the Nodes:

    // Append buttons to operation cell
    opreration_cell.appendChild(removeRowButtton);
    opreration_cell.appendChild(updateRowButtton);
    // Append cells to the row
    row.appendChild(id_cell);
    row.appendChild(first_name_cell);
    row.appendChild(last_name_cell);
    row.appendChild(age_cell);
    row.appendChild(opreration_cell);
    return row
}

const updateUserDataRow = (result) => {
    let first_name = document.querySelector(`[first_name="${result.id}"]`);
    let last_name = document.querySelector(`[last_name="${result.id}"]`);
    let age = document.querySelector(`[age="${result.id}"]`);
    first_name.innerText = result.first_name;
    last_name.innerText = result.last_name;
    age.innerText = result.age;
}

// Call event listener on click event
addObjectButton.addEventListener('click', () => {
    let first_name = firstNameInput.value;
    let last_name = lastNameInput.value;
    let age = ageInput.value;
    if (userIdInput.value === "0") {
        let result = addUser(first_name, last_name, age);
        if (result.error) {
            alert(result.error)
        } else {
            // Append new row to the table
            let row = createTableRow(result);
            tableBody.appendChild(row);
        }
    } else {
        console.log(userIdInput.value);
        let result = updateUser(userIdInput.value, first_name, last_name, age);
        if (!result) {
            return;
        }
        updateUserDataRow(result);
        addObjectButton.innerText = "Add Object";
    }
    // clear the inputs
    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    userIdInput.value = "0";
})
