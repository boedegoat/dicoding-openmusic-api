const Joi = require("joi");
const validate = require("./index");

const exportsSchema = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports.validateExportsPayload = ({ payload }) => {
    validate(exportsSchema, payload);
};
