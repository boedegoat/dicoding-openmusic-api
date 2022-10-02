const redis = require("redis");

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_SERVER || "localhost",
    },
});

client.on("error", (error) => {
    console.error(error);
});

client.connect();

module.exports.set = (key, value, options) => {
    return client.set(key, value, options);
};

module.exports.get = async (key) => {
    const result = await client.get(key);

    if (result === null) {
        throw new Error("Cache tidak ditemukan");
    }

    return result;
};

module.exports.del = (key) => {
    return client.del(key);
};
