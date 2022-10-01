const { nanoid } = require("nanoid");
const { querySingleRow } = require("../../utils/db");
const usersService = require("./UsersService");

module.exports.addCollaboratorToPlaylist = async ({ playlistId, userId }) => {
    // verify if user is exist in db
    await usersService.getUserById(userId);

    const id = `collab-${nanoid(16)}`;

    const newCollaborator = await querySingleRow({
        text: `INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id`,
        values: [id, playlistId, userId],
    });

    return newCollaborator.id;
};

module.exports.deleteCollaboratorInPlaylist = async ({
    playlistId,
    userId,
}) => {
    await querySingleRow({
        text: `DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2`,
        values: [playlistId, userId],
    });
};
