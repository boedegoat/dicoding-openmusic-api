const routes = require("./routes");

module.exports = {
    name: "songs",
    version: "1.0.0",
    register: async (server) => {
        server.route(routes);
    },
};
