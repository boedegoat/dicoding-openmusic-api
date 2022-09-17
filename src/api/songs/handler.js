const { StatusCodes } = require("http-status-codes");
const { apiWrapper, sendResponse } = require("../../utils/api");
const validateSong = require("../../validator/songs");
const {
    addSong,
    getSongs,
    getSongById,
    editSongById,
    deleteSongById,
} = require("../../services/SongsService");

const postSongHandler = apiWrapper(async (req, h) => {
    validateSong(req.payload);

    const { title, year, genre, performer, duration, albumId } = req.payload;
    const songId = await addSong({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
    });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            songId,
        },
    });
});

const getSongsHandler = apiWrapper(async (req, h) => {
    const songs = await getSongs();

    return sendResponse(h, {
        data: {
            songs,
        },
    });
});

const getSongByIdHandler = apiWrapper(async (req, h) => {
    const { id } = req.params;
    const song = await getSongById(id);

    return sendResponse(h, {
        data: {
            song,
        },
    });
});

const editSongByIdHandler = apiWrapper(async (req, h) => {
    validateSong(req.payload);

    const { id } = req.params;
    const { title, year, genre, performer, duration, albumId } = req.payload;

    await editSongById(id, {
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
    });

    return sendResponse(h, {
        message: "sukses memperbarui lagu",
    });
});

const deleteSongByIdHandler = apiWrapper(async (req, h) => {
    const { id } = req.params;
    await deleteSongById(id);

    return sendResponse(h, {
        message: "sukses menghapus lagu",
    });
});

module.exports = {
    postSongHandler,
    getSongsHandler,
    getSongByIdHandler,
    editSongByIdHandler,
    deleteSongByIdHandler,
};
