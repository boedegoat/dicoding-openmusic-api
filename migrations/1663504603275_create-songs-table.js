/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("songs", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        album_id: {
            type: "VARCHAR(50)",
            references: '"albums"',
            onDelete: "cascade",
        },
        title: {
            type: "TEXT",
            notNull: true,
        },
        year: {
            type: "INTEGER",
            notNull: true,
        },
        genre: {
            type: "TEXT",
            notNull: true,
        },
        performer: {
            type: "TEXT",
            notNull: true,
        },
        duration: {
            type: "INTEGER",
        },
        created_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("songs");
};
