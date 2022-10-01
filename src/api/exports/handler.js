const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/exports");
const producerService = require("../../services/mq/ProducerService");
const playlistsService = require("../../services/db/PlaylistsService");

module.exports.postExportPlaylistHandler = async (req, h) => {
    validator.validateExportsPayload({ payload: req.payload });

    const { id: userId } = req.auth.credentials;
    const { playlistId } = req.params;

    await playlistsService.verifyPlaylistAccess({
        role: "owner",
        playlistId,
        userId,
    });

    const { targetEmail } = req.payload;
    const message = {
        targetEmail,
        playlistId,
    };

    await producerService.sendMessage({
        queue: "export:playlists",
        message: JSON.stringify(message),
    });

    return sendResponse(h, {
        code: 201,
        message: "Permintaan Anda dalam antrean",
    });
};
