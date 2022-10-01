const ApiError = require("../../exceptions");
const { querySingleRow } = require("../../utils/db");

module.exports.addRefreshTokenToDb = async ({ refreshToken }) => {
    await querySingleRow({
        text: `INSERT INTO authentications VALUES($1)`,
        values: [refreshToken],
    });
};

module.exports.deleteRefreshTokenInDb = async ({ refreshToken }) => {
    await querySingleRow({
        text: `DELETE FROM authentications WHERE token = $1`,
        values: [refreshToken],
    });
};

module.exports.verifyRefreshTokenInDb = async ({ refreshToken }) => {
    const refreshTokenInDb = await querySingleRow({
        text: `SELECT * FROM authentications WHERE token = $1`,
        values: [refreshToken],
    });

    if (!refreshTokenInDb) {
        throw new ApiError.BadRequestError("Refresh token tidak valid");
    }
};
