require("dotenv").config();
let fs = require("fs").promises;

let amqp = require('amqplib/callback_api');
const queue = process.env.LOG_QUEUE_NAME || "log_queue";
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

const getLogMessage = (message) => {
    return JSON.stringify({
        message: message,
        date: new Date().toLocaleDateString().replaceAll("/", "-")
    })
}

const getFilePath = () => {
    let path = process.cwd() + "/logs/";
    let fileName = new Date().toLocaleDateString().replaceAll("/", "-") + ".log";
    let filePath = path + fileName;
    return filePath
}

const writeLogsInFile = (message) => {
    const filePath = getFilePath();
    fs.appendFile(filePath, getLogMessage(message) + "\n", { encoding: "utf8" });
}

const getLastLogMessages = async () => {
    const filePath = getFilePath();
    try {
        let logs = await fs.readFile(filePath, { encoding: "utf8" });
        logs = logs.split("\n")
        logs = logs.reverse().filter(log => log !== "").slice(0, 6);
        logs = logs.map(log => JSON.parse(log));
        return logs
    } catch (err) {
        console.log("Failed to open log file with error: " + err);
    }
}

module.exports = {
    sendLogToQueue,
    consumeDataFromQueue,
    getLastLogMessages
}