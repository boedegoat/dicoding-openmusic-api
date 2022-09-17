const Joi = require("joi");
const validate = require("./index");

const validateAlbum = (albums) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        year: Joi.number().required(),
    });

    validate(schema, albums);
};

module.exports = validateAlbum;
