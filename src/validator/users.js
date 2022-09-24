const Joi = require("joi");
const validate = require("./index");

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
});

module.exports.validateUserPayload = (payload) => {
    validate(userSchema, payload);
};
