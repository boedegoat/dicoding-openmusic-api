const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/albums");
const albumsService = require("../../services/AlbumsService");

// Add new album
module.exports.postAlbumHandler = async (req, h) => {
    validator.validateAddAlbumPayload({ payload: req.payload });

    const albumId = await albumsService.addAlbum(req.payload);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            albumId,
        },
    });
};

// Get album by id
module.exports.getAlbumByIdHandler = async (req, h) => {
    const { id: albumId } = req.params;
    const album = await albumsService.getAlbumById({ albumId });

    return sendResponse(h, {
        data: {
            album,
        },
    });
};

// Edit album by id
module.exports.putAlbumByIdHandler = async (req, h) => {
    validator.validateEditAlbumPayload({ payload: req.payload });

    const { id: albumId } = req.params;
    await albumsService.editAlbumById({ albumId, ...req.payload });

    return sendResponse(h, {
        message: "sukses memperbarui album",
    });
};

// Delete album by id
module.exports.deleteAlbumByIdHandler = async (req, h) => {
    const { id: albumId } = req.params;
    await albumsService.deleteAlbumById({ albumId });

    return sendResponse(h, {
        message: "sukses menghapus album",
    });
};
