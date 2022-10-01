const handler = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/export/playlists/{playlistId}",
        handler: handler.postExportPlaylistHandler,
        options: {
            auth: "openmusic_jwt",
        },
    },
];
