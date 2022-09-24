const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/authentications",
        handler: handler.postAuthenticationsHandler, // Login
    },
    {
        method: "PUT",
        path: "/authentications",
        handler: handler.putAuthenticationsHandler, // Renew access token
    },
    {
        method: "DELETE",
        path: "/authentications",
        handler: handler.deleteAuthenticationsHandler, // Logout
    },
];
