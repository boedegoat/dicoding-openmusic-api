const { nanoid } = require("nanoid");
const ApiError = require("../exceptions");
const { querySingleRow, queryManyRows } = require("../utils/db");
const songsService = require("./SongsService");

const verifyPlaylistAccess = async ({ role = "", playlistId, userId }) => {
    const playlist = await querySingleRow({
        text: `SELECT * FROM playlists WHERE id = $1`,
        values: [playlistId],
    });

    if (!playlist) {
        throw new ApiError.NotFoundError("Playlist tidak ditemukan");
    }

    if (role === "owner" && playlist.owner !== userId) {
        throw new ApiError.ForbiddenError(
            "Anda tidak diperbolehkan untuk mengakses playlist ini karena bukan milik anda"
        );
    }
};

module.exports.addPlaylist = async ({ name, userId }) => {
    const id = `playlist-${nanoid(16)}`;

    const newPlaylist = await querySingleRow({
        text: `INSERT INTO playlists VALUES($1, $2, $3) RETURNING id`,
        values: [id, name, userId],
    });

    return newPlaylist.id;
};

module.exports.getPlaylists = async ({ userId }) => {
    const myPlaylists = await queryManyRows({
        text: `
            SELECT playlists.id, playlists.name, users.username 
            FROM playlists
            JOIN users
            ON users.id = playlists.owner
            WHERE playlists.owner = $1
        `,
        values: [userId],
    });

    return myPlaylists;
};

module.exports.deletePlaylist = async ({ playlistId, userId }) => {
    await verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    await querySingleRow({
        text: `DELETE FROM playlists WHERE id = $1`,
        values: [playlistId],
    });
};

module.exports.addSongToPlaylist = async ({ playlistId, songId, userId }) => {
    await verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    // verify is song exist in db
    await songsService.getSongById(songId);

    const id = `playlists_songs-${nanoid(16)}`;

    await querySingleRow({
        text: `INSERT INTO playlists_songs VALUES($1, $2, $3)`,
        values: [id, playlistId, songId],
    });
};

module.exports.getSongsInPlaylist = async ({ playlistId, userId }) => {
    await verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    const [playlist, songsInPlaylist] = await Promise.all([
        querySingleRow({
            text: `
                SELECT playlists.id, playlists.name, users.username
                FROM playlists
                JOIN users
                ON users.id = playlists.owner
                WHERE playlists.id = $1
            `,
            values: [playlistId],
        }),
        queryManyRows({
            text: `
                SELECT songs.id, songs.title, songs.performer
                FROM playlists_songs
                JOIN songs
                ON songs.id = playlists_songs.song_id
                WHERE playlists_songs.playlist_id = $1
            `,
            values: [playlistId],
        }),
    ]);

    return {
        ...playlist,
        songs: songsInPlaylist,
    };
};

module.exports.deleteSongFromPlaylist = async ({
    playlistId,
    songId,
    userId,
}) => {
    await verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    await querySingleRow({
        text: `DELETE FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2`,
        values: [playlistId, songId],
    });
};
