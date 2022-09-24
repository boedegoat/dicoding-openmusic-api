require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const { setupJwt } = require("./utils/jwt");

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

    // register external plugins
    await server.register([{ plugin: Jwt }]);

    setupJwt(server);

    // register my plugins
    await server.register([
        { plugin: require("./api/albums") },
        { plugin: require("./api/songs") },
        { plugin: require("./api/users") },
        { plugin: require("./api/authentications") },
        { plugin: require("./api/playlists") },
    ]);

    // before on each sending response, check if there is any client or server error
    server.ext("onPreResponse", require("./exceptions/checkError"));

    // start the server
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

startServer();
