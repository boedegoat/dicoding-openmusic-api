/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("playlists_songs", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        playlist_id: {
            type: "VARCHAR(50)",
            references: '"playlists"',
            onDelete: "cascade",
        },
        song_id: {
            type: "VARCHAR(50)",
            references: '"songs"',
            onDelete: "cascade",
        },
    });

    pgm.addConstraint(
        "playlists_songs",
        "unique_playlist_id_and_song_id",
        "UNIQUE(playlist_id, song_id)"
    );
};

exports.down = (pgm) => {
    pgm.dropTable("playlists_songs");
};
