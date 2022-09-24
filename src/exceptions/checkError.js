const { StatusCodes } = require("http-status-codes");
const { ClientError } = require(".");
const { sendResponse } = require("../utils/api");

const checkError = (request, h) => {
    const { response } = request;

    if (response.isBoom) {
        // Client Error
        if (response instanceof ClientError) {
            return sendResponse(h, {
                code: response.statusCode,
                status: "fail",
                message: response.message,
            });
        }

        // Server Error
        if (response.isServer) {
            console.log({ response });
            return sendResponse(h, {
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                status: "error",
                message: "Maaf, terjadi kegagalan pada server kami.",
            });
        }
    }

    return response;
};

module.exports = checkError;
