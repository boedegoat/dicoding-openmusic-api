require("dotenv").config();
const Hapi = require("@hapi/hapi");

const startServer = async () => {
    // set up server config
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: process.env.HOST || "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    // register plugins
    await server.register([
        { plugin: require("./api/albums") },
        { plugin: require("./api/songs") },
    ]);

    // before on each sending response, check if there is any client or server error
    server.ext("onPreResponse", require("./exceptions/checkError"));

    // start the server
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

startServer();
