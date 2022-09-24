const Joi = require("joi");
const validate = require("./index");

const getAlbumSchema = () => {
    const currentYear = new Date().getFullYear();
    return Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(currentYear).required(),
    });
};

module.exports.validateAddAlbumPayload = ({ payload }) => {
    const albumSchema = getAlbumSchema();
    validate(albumSchema, payload);
};

module.exports.validateEditAlbumPayload = ({ payload }) => {
    const albumSchema = getAlbumSchema();
    validate(albumSchema, payload);
};
