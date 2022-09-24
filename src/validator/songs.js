const Joi = require("joi");
const validate = require("./index");

const getSongSchema = () => {
    const currentYear = new Date().getFullYear();
    return Joi.object({
        albumId: Joi.string(),
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
        genre: Joi.string().required(),
        performer: Joi.string().required(),
        duration: Joi.number(),
    });
};

module.exports.validateAddSongPayload = (payload) => {
    const songSchema = getSongSchema();
    validate(songSchema, payload);
};

module.exports.validateEditSongPayload = (payload) => {
    const songSchema = getSongSchema();
    validate(songSchema, payload);
};
