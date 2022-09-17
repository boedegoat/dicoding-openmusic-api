/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("albums", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        name: {
            type: "TEXT",
            notNull: true,
        },
        year: {
            type: "INTEGER",
            notNull: true,
        },
        created_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "TEXT",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createTable("songs", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        album_id: {
            type: "VARCHAR(30)",
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
    pgm.dropTable("albums");
    pgm.dropTable("songs");
};
