const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validateSong = require("../../validator/songs");
const {
    addSong,
    getSongs,
    getSongById,
    editSongById,
    deleteSongById,
} = require("../../services/SongsService");

const postSongHandler = async (req, h) => {
    validateSong(req.payload);

    const songId = await addSong(req.payload);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            songId,
        },
    });
};

const getSongsHandler = async (req, h) => {
    const { title, performer } = req.query;

    const songs = await getSongs({ title, performer });

    return sendResponse(h, {
        data: {
            songs,
        },
    });
};

const getSongByIdHandler = async (req, h) => {
    const { id } = req.params;
    const song = await getSongById(id);

    return sendResponse(h, {
        data: {
            song,
        },
    });
};

const editSongByIdHandler = async (req, h) => {
    validateSong(req.payload);

    const { id } = req.params;
    await editSongById(id, req.payload);

    return sendResponse(h, {
        message: "sukses memperbarui lagu",
    });
};

const deleteSongByIdHandler = async (req, h) => {
    const { id } = req.params;
    await deleteSongById(id);

    return sendResponse(h, {
        message: "sukses menghapus lagu",
    });
};

module.exports = {
    postSongHandler,
    getSongsHandler,
    getSongByIdHandler,
    editSongByIdHandler,
    deleteSongByIdHandler,
};
