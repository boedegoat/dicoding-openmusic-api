const { Pool } = require("pg");

const db = new Pool();

module.exports.queryManyRows = async (query) => {
    return (await db.query(query)).rows;
};

module.exports.querySingleRow = async (query) => {
    return (await db.query(query)).rows[0];
};

module.exports.mapDbToCamelCase = (data) => {
    return Object.entries(data).reduce((result, [key, value]) => {
        if (key.includes("_")) {
            key = key.replace(/_\w/g, (w) => w.toUpperCase().slice(1));
        }
        result[key] = value;
        return result;
    }, {});
};
