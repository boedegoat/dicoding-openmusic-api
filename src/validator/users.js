const Joi = require("joi");
const validate = require("./index");

module.exports.validateUserPayload = (payload) => {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        fullname: Joi.string().required(),
    });

    validate(userSchema, payload);
};
