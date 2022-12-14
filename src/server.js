require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");
const { setupJwt } = require("./utils/jwt");

global.host = process.env.HOST || "localhost";
global.port = process.env.PORT || 5000;

const startServer = async () => {
    // set up server config
    const server = Hapi.server({
        host: global.host,
        port: global.port,
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    // register external plugins
    await server.register([{ plugin: Jwt }, { plugin: Inert }]);

    setupJwt({ server });

    // register my plugins
    await server.register([
        { plugin: require("./api/albums") },
        { plugin: require("./api/songs") },
        { plugin: require("./api/users") },
        { plugin: require("./api/authentications") },
        { plugin: require("./api/playlists") },
        { plugin: require("./api/collaborations") },
        { plugin: require("./api/exports") },
        { plugin: require("./api/uploads") },
    ]);

    // before on each sending response, check if there is any client or server error
    server.ext("onPreResponse", require("./exceptions/checkError"));

    // start the server
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

startServer();
