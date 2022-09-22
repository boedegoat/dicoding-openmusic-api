const Jwt = require("@hapi/jwt");
const ApiError = require("../exceptions");

module.exports.setupJwt = async (server) => {
    // define jwt auth strategy
    server.auth.strategy("notesapp_jwt", "jwt", {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });
};

module.exports.createAccessToken = (payload) => {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
};

module.exports.createRefreshToken = (payload) => {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
};

module.exports.verifyRefreshTokenValid = (refreshToken) => {
    try {
        const artifacts = Jwt.token.decode(refreshToken);
        Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
        const { payload } = artifacts.decoded;
        return payload;
    } catch (error) {
        throw new ApiError.BadRequestError("Refresh token tidak valid");
    }
};
