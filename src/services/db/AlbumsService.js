const { nanoid } = require("nanoid");
const ApiError = require("../../exceptions");
const { querySingleRow, queryManyRows } = require("../../utils/db");

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
                SELECT id, name, year FROM albums 
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

    return { ...album, songs: songsInAlbum };
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
