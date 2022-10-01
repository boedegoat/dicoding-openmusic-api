const { StatusCodes } = require("http-status-codes");
const validator = require("../../validator/playlists");
const { sendResponse } = require("../../utils/api");
const playlistsService = require("../../services/db/PlaylistsService");
const songsService = require("../../services/db/SongsService");
const activityService = require("../../services/db/PlaylistSongActivitiesService");

// Add new playlist
module.exports.postPlaylistHandler = async (req, h) => {
    validator.validateAddPlaylistPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { name } = req.payload;

    const newPlaylistId = await playlistsService.addPlaylist({ name, userId });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            playlistId: newPlaylistId,
        },
    });
};

// Get my playlists
module.exports.getPlaylistsHandler = async (req, h) => {
    const { id: userId } = req.auth.credentials;

    const playlists = await playlistsService.getPlaylists({ userId });

    return sendResponse(h, {
        data: {
            playlists,
        },
    });
};

// Delete my playlist
module.exports.deletePlaylistHandler = async (req, h) => {
    const { id: userId } = req.auth.credentials;
    const { id: playlistId } = req.params;

    await playlistsService.verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    await playlistsService.deletePlaylist({ playlistId, userId });

    return sendResponse(h, {
        message: "Playlist berhasil dihapus",
    });
};

// Add song in my playlist
module.exports.postSongToPlaylistHandler = async (req, h) => {
    validator.validateAddPlaylistSongPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { id: playlistId } = req.params;
    const { songId } = req.payload;

    await playlistsService.verifyPlaylistAccess({
        playlistId,
        userId,
    });

    // verify is song exist in db
    await songsService.getSongById({ songId });

    await playlistsService.addSongToPlaylist({
        playlistId,
        songId,
    });

    await activityService.addActivity({
        action: "add",
        userId,
        playlistId,
        songId,
    });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        message: "Lagu berhasil ditambahkan ke playlist",
    });
};

// Get songs in my playlist
module.exports.getSongsInPlaylistHandler = async (req, h) => {
    const { id: userId } = req.auth.credentials;
    const { id: playlistId } = req.params;

    await playlistsService.verifyPlaylistAccess({
        playlistId,
        userId,
    });

    const songsInPlaylist = await playlistsService.getSongsInPlaylist({
        userId,
        playlistId,
    });

    return sendResponse(h, {
        data: {
            playlist: songsInPlaylist,
        },
    });
};

// Delete song in my playlist
module.exports.deleteSongFromPlaylistHandler = async (req, h) => {
    validator.validateDeletePlaylistSongPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { id: playlistId } = req.params;
    const { songId } = req.payload;

    await playlistsService.verifyPlaylistAccess({
        playlistId,
        userId,
    });

    await playlistsService.deleteSongFromPlaylist({
        playlistId,
        songId,
    });

    await activityService.addActivity({
        action: "delete",
        userId,
        playlistId,
        songId,
    });

    return sendResponse(h, {
        message: "Lagu berhasil dihapus dari playlist",
    });
};

module.exports.getPlaylistSongActivitiesHandler = async (req, h) => {
    const { id: userId } = req.auth.credentials;
    const { id: playlistId } = req.params;

    await playlistsService.verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    const activities = await playlistsService.getPlaylistSongActivities({
        playlistId,
    });

    return sendResponse(h, {
        data: activities,
    });
};
