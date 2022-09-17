const { Pool } = require("pg");

const db = new Pool();

const mapDbToCamelCase = (data) => {
    return Object.entries(data).reduce((result, [key, value]) => {
        if (key.includes("_")) {
            key = key.replace(/_\w/g, (w) => w.toUpperCase().slice(1));
        }
        result[key] = value;
        return result;
    }, {});
};

module.exports = {
    db,
    mapDbToCamelCase,
};
