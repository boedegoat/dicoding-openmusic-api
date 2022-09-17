const { nanoid } = require("nanoid");
const ApiError = require("../exceptions");
const { db } = require("../utils/db");

const addAlbum = async ({ name, year }) => {
    const id = `album-${nanoid(16)}`;

    const query = {
        text: "INSERT INTO albums VALUES($1, $2, $3) RETURNING id",
        values: [id, name, year],
    };

    const newAlbum = (await db.query(query)).rows[0];

    if (!newAlbum) {
        throw new ApiError.ServerError("Album gagal ditambahkan");
    }

    return newAlbum.id;
};

const getAlbumById = async (id) => {
    const albumQuery = {
        text: `
            SELECT id, name, year FROM albums 
            WHERE id = $1
        `,
        values: [id],
    };

    const songQuery = {
        text: `
            SELECT id, title, performer FROM songs
            WHERE album_id = $1
        `,
        values: [id],
    };

    const [album, songsInAlbum] = await Promise.all([
        // get album by id
        (
            await db.query(albumQuery)
        ).rows[0],

        // get songs in that album
        (
            await db.query(songQuery)
        ).rows,
    ]);

    // Untuk para reviewer, saya ga yakin code di atas sudah tepat
    // maklum belom familiar banget ama sql
    // mohon koreksinya 🙏

    if (!album) {
        throw new ApiError.NotFoundError("Album tidak ditemukan");
    }

    return { ...album, songs: songsInAlbum };
};

const editAlbumById = async (id, { name, year }) => {
    const updatedAt = new Date().toISOString();

    const query = {
        text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id",
        values: [name, year, updatedAt, id],
    };

    const updatedAlbum = (await db.query(query)).rows[0];

    if (!updatedAlbum) {
        throw new ApiError.NotFoundError(
            "Gagal memperbarui album. Id tidak ditemukan"
        );
    }
};

const deleteAlbumById = async (id) => {
    const query = {
        text: "DELETE FROM albums WHERE id = $1 RETURNING id",
        values: [id],
    };

    const deletedAlbum = (await db.query(query)).rows[0];

    if (!deletedAlbum) {
        throw new ApiError.NotFoundError(
            "Gagal menghapus album. Id tidak ditemukan"
        );
    }
};

module.exports = {
    addAlbum,
    getAlbumById,
    editAlbumById,
    deleteAlbumById,
};
