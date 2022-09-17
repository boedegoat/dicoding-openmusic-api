const Joi = require("joi");
const validate = require("./index");

const validateSongs = (songs) => {
    const schema = Joi.object({
        albumId: Joi.string(),
        title: Joi.string().required(),
        year: Joi.number().required(),
        genre: Joi.string().required(),
        performer: Joi.string().required(),
        duration: Joi.number(),
    });

    validate(schema, songs);
};

module.exports = validateSongs;
