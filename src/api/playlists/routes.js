const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/playlists",
        handler: handler.postPlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "GET",
        path: "/playlists",
        handler: handler.getPlaylistsHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "DELETE",
        path: "/playlists/{id}",
        handler: handler.deletePlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "POST",
        path: "/playlists/{id}/songs",
        handler: handler.postSongInPlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "GET",
        path: "/playlists/{id}/songs",
        handler: handler.getSongsInPlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "DELETE",
        path: "/playlists/{id}/songs",
        handler: handler.deleteSongInPlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
    {
        method: "GET",
        path: "/playlists/{id}/activities",
        handler: handler.getPlaylistSongActivitiesHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
];
