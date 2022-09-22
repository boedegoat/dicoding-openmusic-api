const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/albums");
const albumsService = require("../../services/AlbumsService");

module.exports.postAlbumHandler = async (req, h) => {
    validator.validateAlbumPayload(req.payload);

    const { name, year } = req.payload;
    const albumId = await albumsService.addAlbum({ name, year });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            albumId,
        },
    });
};

module.exports.getAlbumByIdHandler = async (req, h) => {
    const { id } = req.params;
    const album = await albumsService.getAlbumById(id);

    return sendResponse(h, {
        data: {
            album,
        },
    });
};

module.exports.editAlbumByIdHandler = async (req, h) => {
    validator.validateAlbumPayload(req.payload);

    const { id } = req.params;
    const { name, year } = req.payload;

    await albumsService.editAlbumById(id, { name, year });

    return sendResponse(h, {
        message: "sukses memperbarui album",
    });
};

module.exports.deleteAlbumByIdHandler = async (req, h) => {
    const { id } = req.params;
    await albumsService.deleteAlbumById(id);

    return sendResponse(h, {
        message: "sukses menghapus album",
    });
};
