const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/users",
        handler: handler.postUserHandler,
    },
];
