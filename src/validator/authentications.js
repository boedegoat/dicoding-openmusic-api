const Joi = require("joi");
const validate = require("./index");

module.exports.validateLoginPayload = (payload) => {
    const loginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    validate(loginSchema, payload);
};

module.exports.validateRefreshTokenPayload = (payload) => {
    const refreshTokenSchema = Joi.object({
        refreshToken: Joi.string().required(),
    });

    validate(refreshTokenSchema, payload);
};

module.exports.validateDeleteRefreshTokenPayload = (payload) => {
    const refreshTokenSchema = Joi.object({
        refreshToken: Joi.string().required(),
    });

    validate(refreshTokenSchema, payload);
};
