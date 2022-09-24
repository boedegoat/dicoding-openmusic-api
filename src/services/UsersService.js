const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { querySingleRow } = require("../utils/db");
const ApiError = require("../exceptions");

const checkUsernameAvailability = async (username) => {
    const user = await querySingleRow({
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username],
    });

    if (user) {
        throw new ApiError.BadRequestError(
            "Gagal menambahkan user. Username sudah digunakan"
        );
    }
};

module.exports.addUser = async ({ username, password, fullname }) => {
    await checkUsernameAvailability(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await querySingleRow({
        text: `INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id`,
        values: [id, username, hashedPassword, fullname],
    });

    return newUser.id;
};

module.exports.verifyLoginCredentials = async ({ username, password }) => {
    const user = await querySingleRow({
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username],
    });

    if (!user) {
        throw new ApiError.AuthenticationError(
            "username yang anda berikan belum terdaftar"
        );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError.AuthenticationError(
            "Password yang anda berikan salah"
        );
    }

    return user.id;
};

module.exports.getUserById = async (userId) => {
    const user = await querySingleRow({
        text: `SELECT * FROM users WHERE id = $1`,
        values: [userId],
    });

    if (!user) {
        throw new ApiError.NotFoundError("User tidak ditemukan");
    }

    return user;
};
