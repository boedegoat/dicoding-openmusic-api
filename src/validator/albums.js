const Joi = require("joi");
const validate = require("./index");

module.exports.validateAlbumPayload = (payload) => {
    const currentYear = new Date().getFullYear();
    const albumSchema = Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
    });

    validate(albumSchema, payload);
};
