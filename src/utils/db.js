const { Pool } = require("pg");

const db = new Pool();

module.exports.queryManyRows = async ({ text, values }) => {
    return (await db.query({ text, values })).rows;
};

module.exports.querySingleRow = async ({ text, values }) => {
    return (await db.query({ text, values })).rows[0];
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
