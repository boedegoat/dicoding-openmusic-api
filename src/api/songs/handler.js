const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/songs");
const songsService = require("../../services/SongsService");

// Add new song
module.exports.postSongHandler = async (req, h) => {
    validator.validateAddSongPayload({ payload: req.payload });

    const songId = await songsService.addSong(req.payload);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            songId,
        },
    });
};

// Get all songs
module.exports.getSongsHandler = async (req, h) => {
    const { title, performer } = req.query;

    const songs = await songsService.getSongs({ title, performer });

    return sendResponse(h, {
        data: {
            songs,
        },
    });
};

// Get song by id
module.exports.getSongByIdHandler = async (req, h) => {
    const { id: songId } = req.params;
    const song = await songsService.getSongById({ songId });

    return sendResponse(h, {
        data: {
            song,
        },
    });
};

// Edit song by id
module.exports.putSongByIdHandler = async (req, h) => {
    validator.validateEditSongPayload({ payload: req.payload });

    const { id: songId } = req.params;

    await songsService.editSongById({
        songId,
        ...req.payload,
    });

    return sendResponse(h, {
        message: "sukses memperbarui lagu",
    });
};

// Delete song by id
module.exports.deleteSongByIdHandler = async (req, h) => {
    const { id: songId } = req.params;
    await songsService.deleteSongById({ songId });

    return sendResponse(h, {
        message: "sukses menghapus lagu",
    });
};
