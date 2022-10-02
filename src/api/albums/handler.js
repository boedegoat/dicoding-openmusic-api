const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../../utils/api");
const albumsValidator = require("../../validator/albums");
const uploadValidator = require("../../validator/uploads");
const albumsService = require("../../services/db/AlbumsService");
const localStorageService = require("../../services/localstorage/LocalStorageService");
const cacheService = require("../../services/cache/CacheService");

const cacheKeys = {
    albumLikes: (albumId) => `album_likes:${albumId}`,
};

// Add new album
module.exports.postAlbumHandler = async (req, h) => {
    albumsValidator.validateAddAlbumPayload({ payload: req.payload });
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
    const cacheKey = cacheKeys.albumLikes(albumId);

    try {
        // if likes still in cache, get it from cache
        const likes = JSON.parse(await cacheService.get(cacheKey));

        const response = sendResponse(h, {
            data: {
                likes,
            },
        });
        response.header("X-Data-Source", "cache");
        return response;
    } catch {
        // otherwise, get likes from db
        const likes = await albumsService.getAlbumLikes({ albumId });

        // then store likes count to cache
        await cacheService.set(cacheKey, JSON.stringify(likes), {
            EX: 30 * 60, // expires in 30 minutes
        });

        return sendResponse(h, {
            data: {
                likes,
            },
        });
    }
};

module.exports.postAlbumLikesHandler = async (req, h) => {
    const { id: albumId } = req.params;
    const { id: userId } = req.auth.credentials;

    const action = await albumsService.toggleLikeAlbum({ albumId, userId });

    // delete cache on every like/unlike action
    await cacheService.del(cacheKeys.albumLikes(albumId));

    return sendResponse(h, {
        code: 201,
        message: `Berhasil ${action} album`,
    });
};
