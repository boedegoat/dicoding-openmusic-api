const { nanoid } = require("nanoid");
const ApiError = require("../exceptions");
const { db, mapDbToCamelCase } = require("../utils/db");

const addSong = async ({
    albumId = null,
    title,
    year,
    genre,
    performer,
    duration = null,
}) => {
    const id = `song-${nanoid(16)}`;

    const query = {
        text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        values: [id, albumId, title, year, genre, performer, duration],
    };

    const newSong = (await db.query(query)).rows[0];

    if (!newSong) {
        throw new ApiError.ServerError("Lagu gagal ditambahkan");
    }

    return newSong.id;
};

const getSongs = async () => {
    const query = {
        text: "SELECT id, title, performer FROM songs",
    };

    const songs = (await db.query(query)).rows;

    return songs.map(mapDbToCamelCase);
};

const getSongById = async (id) => {
    const query = {
        text: `
            SELECT id, title, year, performer, genre, duration, album_id 
            FROM songs 
            WHERE id = $1
        `,
        values: [id],
    };

    const song = (await db.query(query)).rows[0];

    if (!song) {
        throw new ApiError.NotFoundError("Lagu tidak ditemukan");
    }

    return mapDbToCamelCase(song);
};

const editSongById = async (
    id,
    { albumId = null, title, year, genre, performer, duration = null }
) => {
    const updatedAt = new Date().toISOString();

    const query = {
        text: `
            UPDATE songs 
            SET 
                album_id = $1, 
                title = $2, 
                year = $3, 
                genre = $4, 
                performer = $5, 
                duration = $6,    
                updated_at = $7 
            WHERE id = $8 
            RETURNING id
        `,
        values: [
            albumId,
            title,
            year,
            genre,
            performer,
            duration,
            updatedAt,
            id,
        ],
    };

    const updatedSong = (await db.query(query)).rows[0];

    if (!updatedSong) {
        throw new ApiError.NotFoundError(
            "Gagal memperbarui lagu. Id tidak ditemukan"
        );
    }
};

const deleteSongById = async (id) => {
    const query = {
        text: "DELETE FROM songs WHERE id = $1 RETURNING id",
        values: [id],
    };

    const deletedSong = (await db.query(query)).rows[0];

    if (!deletedSong) {
        throw new ApiError.NotFoundError(
            "Gagal menghapus lagu. Id tidak ditemukan"
        );
    }
};

module.exports = {
    addSong,
    getSongs,
    getSongById,
    editSongById,
    deleteSongById,
};
