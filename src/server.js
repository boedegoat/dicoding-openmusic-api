import "dotenv/config";
import Hapi from "@hapi/hapi";

const init = async () => {
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

    // start the server
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init();
