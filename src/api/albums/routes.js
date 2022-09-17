const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/albums",
        handler: handler.postAlbumHandler,
    },
    {
        method: "GET",
        path: "/albums/{id}",
        handler: handler.getAlbumByIdHandler,
    },
    {
        method: "PUT",
        path: "/albums/{id}",
        handler: handler.editAlbumByIdHandler,
    },
    {
        method: "DELETE",
        path: "/albums/{id}",
        handler: handler.deleteAlbumByIdHandler,
    },
];
