const Joi = require("joi");
const validate = require("./index");

module.exports.validateAddPlaylistPayload = (payload) => {
    const playlistSchema = Joi.object({
        name: Joi.string().required(),
    });

    validate(playlistSchema, payload);
};

module.exports.validateAddPlaylistSongPayload = (payload) => {
    const playlistSchema = Joi.object({
        songId: Joi.string().required(),
    });

    validate(playlistSchema, payload);
};

module.exports.validateDeletePlaylistSongPayload = (payload) => {
    const playlistSchema = Joi.object({
        songId: Joi.string().required(),
    });

    validate(playlistSchema, payload);
};
