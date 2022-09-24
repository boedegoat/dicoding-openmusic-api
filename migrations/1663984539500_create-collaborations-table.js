/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("collaborations", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        playlist_id: {
            type: "VARCHAR(50)",
            references: '"playlists"',
            onDelete: "cascade",
        },
        user_id: {
            type: "VARCHAR(50)",
            references: '"users"',
            onDelete: "cascade",
        },
    });

    pgm.addConstraint(
        "collaborations",
        "unique_playlist_id_and_user_id",
        "UNIQUE(playlist_id, user_id)"
    );
};

exports.down = (pgm) => {
    pgm.dropTable("collaborations");
};
