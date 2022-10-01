const path = require("path");

module.exports = [
    {
        method: "GET",
        path: "/upload/{param*}",
        handler: {
            directory: {
                path: path.resolve(__dirname, "file"),
            },
        },
    },
];
