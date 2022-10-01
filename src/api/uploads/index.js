const routes = require("./routes");

module.exports = {
    name: "uploads",
    version: "1.0.0",
    register: async (server) => {
        server.route(routes);
    },
};
