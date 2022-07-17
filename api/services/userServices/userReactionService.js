// const userDao = require('../../daos/userDao/userDao');
const contentDao = require('../../daos/contentDao/contentDao');

const getListOfUsersWhoDidReaction = async (req, res) => {
    const response = {
        "per_page": 0,
        "total": 0,
        "total_pages": 0,
        "data": []
    };

    const reactions = await contentDao.getAllReactionContentByContentId(req.params.contentId, req.params.limit, req.params.page);
    if (reactions && reactions.data) {
        response.per_page = reactions.per_page;
        response.total = reactions.total;
        response.total_pages = reactions.total_pages;
        response.data = reactions.data.map(r => r.user);
    }

    return res.status(200).json({
        success: true,
        data: response,
        code: 200,
    });
}


module.exports = {
    getListOfUsersWhoDidReaction,
};