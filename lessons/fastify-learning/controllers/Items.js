const { v4: uuidv4 } = require("uuid");
let Items = require("../db/Items");

const getItems = (request, response) => {
    response.send(Items);
}

const getItem = (request, response) => {
    let { id } = request.params;
    let item = Items.find(item => item.id === id);
    response.send(item);
}

const addItem = (request, response) => {
    let { name } = request.body;
    let item = {
        id: uuidv4(),
        name
    }
    Items = [...Items, item];
    response.code(201).send(item);
}

const updateItem = (request, response) => {
    let { id } = request.params;
    let { name } = request.body;
    let item = Items.find(item => item.id === id);
    if (item) {
        item.name = name;
        Items.map(dbItem => dbItem.id === id ? item : dbItem);
        response.send(item);
    } else {
        response.code(404).send({ "error": "Item not found" })
    }
}

const deleteItem = (request, response) => {
    let { id } = request.params;
    Items = Items.filter(item => item.id !== id);
    response.send({ message: "Item deleted" });
}

module.exports = { getItems, getItem, addItem, updateItem, deleteItem }