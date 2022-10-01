const Joi = require("joi");
const validate = require("./index");

const imageHeadersSchema = Joi.object({
    "content-type": Joi.string()
        // the string must be ONE of these
        .valid(
            "image/apng",
            "image/avif",
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp"
        )
        .required(),
}).unknown();

module.exports.validateImageHeaders = ({ payload }) => {
    validate(imageHeadersSchema, payload);
};
