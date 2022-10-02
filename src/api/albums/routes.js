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
        handler: handler.putAlbumByIdHandler,
    },
    {
        method: "DELETE",
        path: "/albums/{id}",
        handler: handler.deleteAlbumByIdHandler,
    },
    {
        method: "POST",
        path: "/albums/{id}/covers",
        handler: handler.postAlbumCoverHandler,
        options: {
            payload: {
                allow: "multipart/form-data",
                multipart: true,
                output: "stream",
                maxBytes: 512000, // 500-an kb
            },
        },
    },
    {
        method: "GET",
        path: "/albums/{id}/likes",
        handler: handler.getAlbumLikesHandler,
    },
    {
        method: "POST",
        path: "/albums/{id}/likes",
        handler: handler.postAlbumLikesHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
];
