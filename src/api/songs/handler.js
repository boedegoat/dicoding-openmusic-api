const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/songs");
const songsService = require("../../services/SongsService");

module.exports.postSongHandler = async (req, h) => {
    validator.validateSongPayload(req.payload);

    const songId = await songsService.addSong(req.payload);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            songId,
        },
    });
};

module.exports.getSongsHandler = async (req, h) => {
    const { title, performer } = req.query;

    const songs = await songsService.getSongs({ title, performer });

    return sendResponse(h, {
        data: {
            songs,
        },
    });
};

module.exports.getSongByIdHandler = async (req, h) => {
    const { id } = req.params;
    const song = await songsService.getSongById(id);

    return sendResponse(h, {
        data: {
            song,
        },
    });
};

module.exports.editSongByIdHandler = async (req, h) => {
    validator.validateSongPayload(req.payload);

    const { id } = req.params;
    await songsService.editSongById(id, req.payload);

    return sendResponse(h, {
        message: "sukses memperbarui lagu",
    });
};

module.exports.deleteSongByIdHandler = async (req, h) => {
    const { id } = req.params;
    await songsService.deleteSongById(id);

    return sendResponse(h, {
        message: "sukses menghapus lagu",
    });
};
