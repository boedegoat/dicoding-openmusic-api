const Joi = require("joi");
const validate = require("./index");

module.exports.validateSongPayload = (payload) => {
    const currentYear = new Date().getFullYear();
    const songSchema = Joi.object({
        albumId: Joi.string(),
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
        genre: Joi.string().required(),
        performer: Joi.string().required(),
        duration: Joi.number(),
    });

    validate(songSchema, payload);
};
