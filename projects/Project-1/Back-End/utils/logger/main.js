require("dotenv").config();
let fs = require("fs").promises;

let amqp = require('amqplib/callback_api');
const queue = process.env.LOG_QUEUE_NAME || log_queue;
const amqpServer = process.env.RABBITMQ_SERVER;

const sendLogToQueue = async (logMessage = "") => {
    amqp.connect(amqpServer, function (error0, connection) {
        if (error0) throw error0;

        connection.createChannel(function (error1, channel) {
            if (error1) throw error1;

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
    amqp.connect(amqpServer, function (error0, connection) {
        if (error0) throw error0;
        connection.createChannel(function (error1, channel) {
            if (error1) throw error1;

            channel.assertQueue(queue, {
                durable: false
            })

            channel.consume(queue, function (msg) {
                writeLogsInFile(msg.content.toString());
            }, { noAck: true })
        })
    })
}

const writeLogsInFile = (message) => {
    let path = process.cwd() + "/logs/";
    let fileName = new Date().toLocaleDateString().replaceAll("/", "-") + ".log";
    let filePath = path + fileName;
    fs.appendFile(filePath, message + "\n", { encoding: "utf8" });
}

module.exports = {
    sendLogToQueue,
    consumeDataFromQueue
}