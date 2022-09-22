const { StatusCodes } = require("http-status-codes");
const authService = require("../../services/AuthenticationsService");
const { verifyLoginCredentials } = require("../../services/UsersService");
const { sendResponse } = require("../../utils/api");
const token = require("../../utils/jwt");
const validator = require("../../validator/authentications");

module.exports.loginHandler = async (req, h) => {
    validator.validateLoginPayload(req.payload);

    const userId = await verifyLoginCredentials(req.payload);

    const accessToken = token.createAccessToken({ id: userId });
    const refreshToken = token.createRefreshToken({ id: userId });

    await authService.addRefreshTokenToDb(refreshToken);

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        message: "Authentication berhasil ditambahkan",
        data: {
            accessToken,
            refreshToken,
        },
    });
};

module.exports.refreshTokenHandler = async (req, h) => {
    validator.validateRefreshTokenPayload(req.payload);

    const { refreshToken } = req.payload;

    await authService.verifyRefreshTokenInDb(refreshToken);
    const { id: userId } = token.verifyRefreshTokenValid(refreshToken);

    const newAccessToken = token.createAccessToken({ id: userId });

    return sendResponse(h, {
        message: "Access Token berhasil diperbarui",
        data: {
            accessToken: newAccessToken,
        },
    });
};

module.exports.deleteRefreshTokenHandler = async (req, h) => {
    validator.validateDeleteRefreshTokenPayload(req.payload);

    const { refreshToken } = req.payload;

    await authService.verifyRefreshTokenInDb(refreshToken);
    await authService.deleteRefreshTokenInDb(refreshToken);

    return sendResponse(h, {
        message: "Refresh token berhasil dihapus",
    });
};
