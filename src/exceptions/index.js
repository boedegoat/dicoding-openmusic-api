const { StatusCodes } = require("http-status-codes");

class ClientError extends Error {
    constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
        super(message);
        this.name = "ClientError";
        this.statusCode = statusCode;
    }
}

class ServerError extends Error {
    constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ServerError";
        this.statusCode = statusCode;
    }
}

class BadRequestError extends ClientError {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}

class NotFoundError extends ClientError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
        this.name = "NotFoundError";
    }
}

class AuthenticationError extends ClientError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
        this.name = "AuthenticationError";
    }
}

const ApiError = {
    ClientError,
    ServerError,
    BadRequestError,
    NotFoundError,
    AuthenticationError,
};

module.exports = ApiError;
