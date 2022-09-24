const { StatusCodes } = require("http-status-codes");
const usersService = require("../../services/UsersService");
const { sendResponse } = require("../../utils/api");
const validator = require("../../validator/users");

// Register / Sign Up user handler
module.exports.postUserHandler = async (req, h) => {
    validator.validateUserPayload(req.payload);

    const newUserId = await usersService.addUser(req.payload);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        data: {
            userId: newUserId,
        },
    });
};
