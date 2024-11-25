const { db } = require(process.cwd() + "/ORM/main");


const createCommentHandler = async (request, response) => {
    const { id: contact_request_id } = request.params;
    const admin_username = request.user.username;
    const { message } = request.body;
    try {
        const comment = await db.contactRequestComments.create({ message, contact_request_id, admin_username });
        return response.code(201).send({ id: comment.id, message: comment.message });
    } catch (err) {
        return response.code(500).send({ message: "Failed to create comment object" })
    }
}

const retrieveAllCommentsHandler = async (request, response) => {
    const { id: contact_request_id } = request.params;
    const comments = await db.contactRequestComments.filter(contact_request_id);
    response.code(200).send(comments);
}

module.exports = {
    createCommentHandler,
    retrieveAllCommentsHandler
}