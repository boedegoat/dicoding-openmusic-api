const amqp = require("amqplib");

module.exports.sendMessage = async ({ queue, message }) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    // create queue channel if not exist yet
    await channel.assertQueue(queue, {
        durable: true,
    });

    // send message to queue in buffer form
    await channel.sendToQueue(queue, Buffer.from(message));

    // close connection after 1s
    setTimeout(() => {
        connection.close();
    }, 1000);
};
