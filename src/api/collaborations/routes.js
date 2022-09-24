const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/collaborations",
        handler: handler.postCollaborationsHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "DELETE",
        path: "/collaborations",
        handler: handler.deleteCollaborationsHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
];
