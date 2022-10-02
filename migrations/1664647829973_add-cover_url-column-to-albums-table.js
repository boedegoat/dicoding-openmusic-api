/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.addColumn("albums", {
        cover_url: {
            type: "TEXT",
        },
    });
};

exports.down = (pgm) => {
    pgm.dropColumn("albums", "cover_url", { ifExists: true });
};
