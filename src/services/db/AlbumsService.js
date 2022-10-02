const { nanoid } = require("nanoid");
const ApiError = require("../../exceptions");
const {
    querySingleRow,
    queryManyRows,
    mapDbToCamelCase,
} = require("../../utils/db");

module.exports.addAlbum = async ({ name, year }) => {
    const id = `album-${nanoid(16)}`;

    const newAlbum = await querySingleRow({
        text: "INSERT INTO albums VALUES($1, $2, $3) RETURNING id",
        values: [id, name, year],
    });

    if (!newAlbum) {
        throw new ApiError.ServerError("Album gagal ditambahkan");
    }

    return newAlbum.id;
};

module.exports.getAlbumById = async ({ albumId }) => {
    const [album, songsInAlbum] = await Promise.all([
        // get album by id
        querySingleRow({
            text: `
                SELECT id, name, year, cover_url FROM albums 
                WHERE id = $1
            `,
            values: [albumId],
        }),

        // get songs in that album
        queryManyRows({
            text: `
                SELECT id, title, performer FROM songs
                WHERE album_id = $1
            `,
            values: [albumId],
        }),
    ]);

    if (!album) {
        throw new ApiError.NotFoundError("Album tidak ditemukan");
    }

    return { ...mapDbToCamelCase(album), songs: songsInAlbum };
};

module.exports.editAlbumById = async ({ albumId, name, year }) => {
    const updatedAt = new Date().toISOString();

    const updatedAlbum = await querySingleRow({
        text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id",
        values: [name, year, updatedAt, albumId],
    });

    if (!updatedAlbum) {
        throw new ApiError.NotFoundError(
            "Gagal memperbarui album. Id tidak ditemukan"
        );
    }
};

module.exports.deleteAlbumById = async ({ albumId }) => {
    const deletedAlbum = await querySingleRow({
        text: "DELETE FROM albums WHERE id = $1 RETURNING id",
        values: [albumId],
    });

    if (!deletedAlbum) {
        throw new ApiError.NotFoundError(
            "Gagal menghapus album. Id tidak ditemukan"
        );
    }
};

module.exports.storeAlbumCoverUrl = ({ coverUrl, albumId }) => {
    return querySingleRow({
        text: `UPDATE albums SET cover_url = $1 WHERE id = $2 RETURNING id`,
        values: [coverUrl, albumId],
    });
};

module.exports.getAlbumLikes = async ({ albumId }) => {
    const { count: likes } = await querySingleRow({
        text: `SELECT COUNT(*) FROM album_likes WHERE album_id = $1`,
        values: [albumId],
    });

    return Number(likes);
};

module.exports.toggleLikeAlbum = async ({ albumId, userId }) => {
    const album = await querySingleRow({
        text: `SELECT id FROM albums WHERE id = $1`,
        values: [albumId],
    });

    if (!album) {
        throw new ApiError.NotFoundError("Album tidak ditemukan");
    }

    const likedAlbum = await querySingleRow({
        text: `SELECT id FROM album_likes WHERE album_id = $1 AND user_id = $2`,
        values: [album.id, userId],
    });

    let query = {};
    let action = "";

    // (Unlike) if user already liked the album, then delete record from album_likes
    if (likedAlbum) {
        action = "batal menyukai";
        query = {
            text: `DELETE FROM album_likes WHERE album_id = $1 AND user_id = $2`,
            values: [album.id, userId],
        };
    }
    // (Like) otherwise, add record to album_likes
    else {
        action = "menyukai";
        const id = `album_likes-${nanoid(16)}`;
        query = {
            text: `INSERT INTO album_likes VALUES($1, $2, $3)`,
            values: [id, albumId, userId],
        };
    }

    await querySingleRow(query);

    return action;
};
