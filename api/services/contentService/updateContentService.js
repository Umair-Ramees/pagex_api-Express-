const { updateRevealWorkByContentId } = require('../../daos/contentDao/contentDao');

async function updateRevealWorkByContentIdService(res, contentID, userID) {
    const contents = await updateRevealWorkByContentId(contentID, userID);
    res.status(200).json({
        success: true,
        code: 200,
        data: {
            msg: "Content Revealed !",
            contents
        },
    });
}

module.exports = {
    updateRevealWorkByContentIdService
};
