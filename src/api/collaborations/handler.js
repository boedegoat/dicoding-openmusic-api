const { StatusCodes } = require("http-status-codes");
const validator = require("../../validator/collaborations");
const collabsService = require("../../services/collaborationsService");
const { sendResponse } = require("../../utils/api");
const playlistsService = require("../../services/PlaylistsService");

// Add new collaborator to playlist
module.exports.postCollaborationsHandler = async (req, h) => {
    validator.validateAddCollaboratorPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { playlistId, userId: newCollabUserId } = req.payload;

    await playlistsService.verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    const newCollabId = await collabsService.addCollaboratorToPlaylist({
        playlistId,
        userId: newCollabUserId,
    });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            collaborationId: newCollabId,
        },
    });
};

// Delete collaborator from playlist
module.exports.deleteCollaborationsHandler = async (req, h) => {
    validator.validateDeleteCollaboratorPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { playlistId, userId: newCollabUserId } = req.payload;

    await playlistsService.verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    await collabsService.deleteCollaboratorInPlaylist({
        playlistId,
        userId: newCollabUserId,
    });

    return sendResponse(h, {
        message: "Collaborator berhasil dihapus",
    });
};
