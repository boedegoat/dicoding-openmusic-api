const Joi = require("joi");
const validate = require("./index");

const validateSongs = (song) => {
    const currentYear = new Date().getFullYear();
    const schema = Joi.object({
        albumId: Joi.string(),
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
        genre: Joi.string().required(),
        performer: Joi.string().required(),
        duration: Joi.number(),
    });

    validate(schema, song);
};

module.exports = validateSongs;
