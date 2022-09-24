const { StatusCodes } = require("http-status-codes");
const authService = require("../../services/AuthenticationsService");
const { verifyLoginCredentials } = require("../../services/UsersService");
const { sendResponse } = require("../../utils/api");
const token = require("../../utils/jwt");
const validator = require("../../validator/authentications");

// Login handler
module.exports.postAuthenticationsHandler = async (req, h) => {
    validator.validateLoginPayload({ payload: req.payload });

    const userId = await verifyLoginCredentials(req.payload);

    const accessToken = token.createAccessToken({
        payload: {
            id: userId,
        },
    });
    const refreshToken = token.createRefreshToken({
        payload: {
            id: userId,
        },
    });

    await authService.addRefreshTokenToDb({ refreshToken });

    return sendResponse(h, {
        code: StatusCodes.CREATED,
        message: "Authentication berhasil ditambahkan",
        data: {
            accessToken,
            refreshToken,
        },
    });
};

// Renew access token by refresh token
module.exports.putAuthenticationsHandler = async (req, h) => {
    validator.validateRefreshTokenPayload({ payload: req.payload });

    const { refreshToken } = req.payload;

    await authService.verifyRefreshTokenInDb({ refreshToken });
    const { id: userId } = token.verifyRefreshTokenValid({ refreshToken });

    const newAccessToken = token.createAccessToken({
        payload: {
            id: userId,
        },
    });

    return sendResponse(h, {
        message: "Access Token berhasil diperbarui",
        data: {
            accessToken: newAccessToken,
        },
    });
};

// Logout (Delete refresh token in db)
module.exports.deleteAuthenticationsHandler = async (req, h) => {
    validator.validateDeleteRefreshTokenPayload({ payload: req.payload });

    const { refreshToken } = req.payload;

    await authService.verifyRefreshTokenInDb({ refreshToken });
    await authService.deleteRefreshTokenInDb({ refreshToken });

    return sendResponse(h, {
        message: "Refresh token berhasil dihapus",
    });
};
