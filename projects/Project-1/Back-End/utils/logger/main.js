require("dotenv").config();

let amqp = require('amqplib/callback_api');
const queue = process.env.LOG_QUEUE_NAME || log_queue;
const amqpServer = 'amqp://localhost';

const sendLogToQueue = async (logMessage = "") => {
    amqp.connect(amqpServer, function (error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(logMessage));
            console.log("[x] Sent %s", logMessage);
        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });

}

const consumeDataFromQueue = () => {
    amqp.connect(amqpServer, function (errror0, connection) {
        if (error0) throw errror0;
        connection.createChannel(function (error1, channel) {
            if (error1) throw errror1;

            channel.assertQueue(queue, {
                durable: false
            })

            channel.consume(queue, function (msg) {
                console.log("recieve Message" + msg.content.toString())
            }, { noAck: true })
        })
    })
}

module.exports = {
    sendLogToQueue,
    consumeDataFromQueue
}