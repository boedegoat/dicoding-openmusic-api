const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/authentications",
        handler: handler.loginHandler,
    },
    {
        method: "PUT",
        path: "/authentications",
        handler: handler.refreshTokenHandler,
    },
    {
        method: "DELETE",
        path: "/authentications",
        handler: handler.deleteRefreshTokenHandler,
    },
];
