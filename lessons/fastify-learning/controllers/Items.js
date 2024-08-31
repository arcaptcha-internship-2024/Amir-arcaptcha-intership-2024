const Items = require("../db/Items");

const getItems = (request, response) => {
    response.send(Items);
}

const getItem = (request, response) => {
    let { id } = request.params;
    id = parseInt(id);

    let item = Items.find(item => item.id === id);
    response.send(item);
}

module.exports = { getItems, getItem }