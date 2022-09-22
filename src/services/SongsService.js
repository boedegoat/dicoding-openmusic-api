const { nanoid } = require("nanoid");
const ApiError = require("../exceptions");
const {
    queryManyRows,
    querySingleRow,
    mapDbToCamelCase,
} = require("../utils/db");

module.exports.addSong = async ({
    albumId = null,
    title,
    year,
    genre,
    performer,
    duration = null,
}) => {
    const id = `song-${nanoid(16)}`;

    const newSong = await querySingleRow({
        text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        values: [id, albumId, title, year, genre, performer, duration],
    });

    if (!newSong) {
        throw new ApiError.ServerError("Lagu gagal ditambahkan");
    }

    return newSong.id;
};

module.exports.getSongs = async ({ title = "", performer = "" }) => {
    const songs = await queryManyRows({
        text: `
            SELECT id, title, performer FROM songs
            WHERE title ILIKE $1 AND performer ILIKE $2
        `,
        values: [`%${title}%`, `%${performer}%`],
    });

    return songs;
};

module.exports.getSongById = async (id) => {
    const song = await querySingleRow({
        text: `
            SELECT id, title, year, performer, genre, duration, album_id 
            FROM songs 
            WHERE id = $1
        `,
        values: [id],
    });

    if (!song) {
        throw new ApiError.NotFoundError("Lagu tidak ditemukan");
    }

    return mapDbToCamelCase(song);
};

module.exports.editSongById = async (
    id,
    { albumId = null, title, year, genre, performer, duration = null }
) => {
    const updatedAt = new Date().toISOString();

    const updatedSong = await querySingleRow({
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
    });

    if (!updatedSong) {
        throw new ApiError.NotFoundError(
            "Gagal memperbarui lagu. Id tidak ditemukan"
        );
    }
};

module.exports.deleteSongById = async (id) => {
    const deletedSong = await querySingleRow({
        text: "DELETE FROM songs WHERE id = $1 RETURNING id",
        values: [id],
    });

    if (!deletedSong) {
        throw new ApiError.NotFoundError(
            "Gagal menghapus lagu. Id tidak ditemukan"
        );
    }
};
