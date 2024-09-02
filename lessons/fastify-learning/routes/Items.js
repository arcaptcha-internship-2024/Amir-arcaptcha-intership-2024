const { getItems, getItem, addItem, updateItem, deleteItem } = require("../controllers/Items");

const Item = {
    type: "object",
    properties: {
        id: { type: "string" },
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

const addItemOpt = {
    shcema: {
        body: {
            type: "object",
            required: ['name'],
            properties: {
                name: { type: "string" }
            }
        },
        response: {
            201: Item
        }
    },
    handler: addItem,
}

const updateItemOpt = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            }
        },
        response: {
            200: Item,
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                }
            }
        }
    },
    handler: updateItem
}

const deleteItemOpt = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        },
    },
    handler: deleteItem
}

const ItemRoutes = (fastify, options, done) => {
    // Get All Items
    fastify.get("/items/", getItemsOpt);

    // Get Single item
    fastify.get("/items/:id", getItemOpt);

    // Add Single Item
    fastify.post("/items/create/", addItemOpt);

    // Update Single Item
    fastify.put("/items/update/:id", updateItemOpt);

    // Update Single Item
    fastify.delete("/items/delete/:id", deleteItemOpt);

    done();
}

module.exports = ItemRoutes;