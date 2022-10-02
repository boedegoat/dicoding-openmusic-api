const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const albumsValidator = require("../../validator/albums");
const uploadValidator = require("../../validator/uploads");
const albumsService = require("../../services/db/AlbumsService");
const localStorageService = require("../../services/localstorage/LocalStorageService");

// Add new album
module.exports.postAlbumHandler = async (req, h) => {
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
    albumsValidator.validateEditAlbumPayload({ payload: req.payload });

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

// Upload album cover
module.exports.postAlbumCoverHandler = async (req, h) => {
    const { cover } = req.payload;

    uploadValidator.validateImageHeaders({ payload: cover.hapi.headers });

    const { id: albumId } = req.params;

    const coverUrl = await localStorageService.writeFile({
        file: cover,
        meta: cover.hapi,
    });

    await albumsService.storeAlbumCoverUrl({ albumId, coverUrl });

    return sendResponse(h, {
        code: 201,
        message: "Sampul berhasil diunggah",
    });
};

module.exports.getAlbumLikesHandler = async (req, h) => {
    const { id: albumId } = req.params;

    const likes = await albumsService.getAlbumLikes({ albumId });

    return sendResponse(h, {
        data: {
            likes,
        },
    });
};

module.exports.postAlbumLikesHandler = async (req, h) => {
    const { id: albumId } = req.params;
    const { id: userId } = req.auth.credentials;

    const action = await albumsService.toggleLikeAlbum({ albumId, userId });

    return sendResponse(h, {
        code: 201,
        message: `Berhasil ${action} album`,
    });
};
