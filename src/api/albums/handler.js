const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validateAlbum = require("../../validator/albums");
const {
    addAlbum,
    getAlbumById,
    editAlbumById,
    deleteAlbumById,
} = require("../../services/AlbumsService");

const postAlbumHandler = async (req, h) => {
    validateAlbum(req.payload);

    const { name, year } = req.payload;
    const albumId = await addAlbum({ name, year });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            albumId,
        },
    });
};

const getAlbumByIdHandler = async (req, h) => {
    const { id } = req.params;
    const album = await getAlbumById(id);

    return sendResponse(h, {
        data: {
            album,
        },
    });
};

const editAlbumByIdHandler = async (req, h) => {
    validateAlbum(req.payload);

    const { id } = req.params;
    const { name, year } = req.payload;

    await editAlbumById(id, { name, year });

    return sendResponse(h, {
        message: "sukses memperbarui album",
    });
};

const deleteAlbumByIdHandler = async (req, h) => {
    const { id } = req.params;
    await deleteAlbumById(id);

    return sendResponse(h, {
        message: "sukses menghapus album",
    });
};

module.exports = {
    postAlbumHandler,
    getAlbumByIdHandler,
    editAlbumByIdHandler,
    deleteAlbumByIdHandler,
};
