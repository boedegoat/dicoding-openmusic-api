const ApiError = require("../exceptions");

const validate = (schema, payload) => {
    const { error } = schema.validate(payload);
    if (error) {
        throw new ApiError.BadRequestError(error.message);
    }
};

module.exports = validate;
