const { nanoid } = require("nanoid");
const { querySingleRow } = require("../../utils/db");

module.exports.addActivity = async ({ userId, playlistId, songId, action }) => {
    const id = `ps_activity-${nanoid(16)}`;

    await querySingleRow({
        text: `INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5)`,
        values: [id, playlistId, songId, userId, action],
    });
};
