/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("album_likes", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        album_id: {
            type: "VARCHAR(50)",
            references: '"albums"',
            onDelete: "cascade",
        },
        user_id: {
            type: "VARCHAR(50)",
            references: '"users"',
            onDelete: "cascade",
        },
    });

    pgm.addConstraint(
        "album_likes",
        "unique_album_id_and_user_id",
        "UNIQUE(album_id, user_id)"
    );
};

exports.down = (pgm) => {
    pgm.dropTable("album_likes");
};
