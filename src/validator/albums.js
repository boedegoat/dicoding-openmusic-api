const Joi = require("joi");
const validate = require("./index");

const validateAlbum = (albums) => {
    const currentYear = new Date().getFullYear();
    const schema = Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
    });

    validate(schema, albums);
};

module.exports = validateAlbum;
