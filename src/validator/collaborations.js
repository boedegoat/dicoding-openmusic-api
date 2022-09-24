const Joi = require("joi");
const validate = require("./index");

const collaboratorSchema = Joi.object({
    playlistId: Joi.string().required(),
    userId: Joi.string().required(),
});

module.exports.validateAddCollaboratorPayload = ({ payload }) => {
    validate(collaboratorSchema, payload);
};

module.exports.validateDeleteCollaboratorPayload = ({ payload }) => {
    validate(collaboratorSchema, payload);
};
