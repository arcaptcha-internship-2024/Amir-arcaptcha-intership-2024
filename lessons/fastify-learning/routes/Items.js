const { getItems, getItem } = require("../controllers/Items");

const Item = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" }
    }
}

const getItemsOpt = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Item,
            },
        }
    },
    handler: getItems
}

const getItemOpt = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}

const ItemRoutes = (fastify, options, done) => {
    // Get All Items
    fastify.get("/items", getItemsOpt)

    // Get Single items
    fastify.get("/items/:id", getItemOpt)

    done();
}

module.exports = ItemRoutes;