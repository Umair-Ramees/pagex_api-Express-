const userDao = require('../../daos/userDao/userDao');
const contentDao = require('../../daos/contentDao/contentDao');

const getListOfUsersWhoDidPromotion = async (contentId, res) => {
    let users = [];
    const promotions = await contentDao.getAllPromotionContentByContentId(contentId);
    const userIds = promotions.map(r => r.user);
    if (userIds.length) {
        users = await userDao.getUsersShortInfo(userIds);
    }
    return res.status(200).json({
        success: true,
        data: users,
        code: 200,
    });
}


module.exports = {
    getListOfUsersWhoDidPromotion,
};