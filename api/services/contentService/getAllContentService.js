const ContentDao = require('../../daos/contentDao/contentDao');
const { isUserAuthorized } = require('../../utils/utils');

async function getAllContents(res, page, limit) {
    let contents = await ContentDao.getAllContentByPageLimit(res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}
async function getContentsByCategory(res, page, limit, category) {
    let contents = await ContentDao.getAllContentByCategoryPageLimit(res, page, limit, category);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}
async function getAllContentsWithContribution(res, page, limit, userId) {
    let contents = await ContentDao.getAllContentsWithContributionByPageLimit(res, page, limit, userId);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}

async function getAllContentsWithContributionByPage(res, page, limit, pageId) {
    let contents = await ContentDao.getAllContentsWithContributionByPageLimitByPage(res, page, limit, pageId);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}

async function getAllContentsByParentId(res, id) {
    let contents = await ContentDao.getAllContentsByParentId(res, id);
    await res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}

async function getContentsById(res, id) {
    let contents = await ContentDao.getContentsById(res, id);
    await res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}

async function getAllContentsWithWork(res, page, limit, userId) {
    let contents = await ContentDao.getAllContentsWithWorkByPageLimit(res, page, limit, userId);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
}

const getAllReactionContentByUserId = async (req, userId, res) => {
    const contents = await ContentDao.getAllReactionContentByUserId(userId);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllReactionContentByContentId = async (req, res) => {
    const contents = await ContentDao.getAllReactionContentByContentId(req.params.contentId, req.params.limit, req.params.page);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllPromotionContentByUserId = async (req, userId, res) => {
    const contents = await ContentDao.getAllPromotionContentByUserId(userId);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getContributionsByContentTagOrUserIdWithPageLimit = async (req, page, limit, userId, contentTag, res) => {
    const contents = await ContentDao.getContributionsByContentTagOrUserIdWithPageLimit(page, limit, userId, contentTag);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllContentsByPassion = async (req, res, page, limit) => {
    const contents = await ContentDao.getAllContentsByPassionWithPageLimit(req, res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllContentsByArtFrom = async (req, res, page, limit) => {
    const contents = await ContentDao.getAllContentsByArtFromWithPageLimit(req, res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllContentsBySubject = async (req, res, page, limit) => {
    const contents = await ContentDao.getAllContentsBySubjectWithPageLimit(req, res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getAllContentsExploreByPassion = async (req, res, page, limit) => {
    if (req.params.passion) {
        const contents = await ContentDao.getAllContentsExplorePassionIdWithPageLimit(req, res, req.params.passion, page, limit);
        return res.status(200).json({
            success: true,
            code: 200,
            data: contents,
        });
    }

    return res.status(404).json({
        success: false,
        code: 404,
        data: {
            msg: 'Please provide valid passion Id',
        },
    });
};

const getAllContentsExplorePassionIdAndColumnWithPageLimit = async (req, res, page, limit) => {
    if (req.params.passion && req.params.column) {
        const contents = await ContentDao.getAllContentsExplorePassionIdAndColumnWithPageLimit(req, res, req.params.passion, req.params.column, page, limit);
        return res.status(200).json({
            success: true,
            code: 200,
            data: contents,
        });
    }

    return res.status(404).json({
        success: false,
        code: 404,
        data: {
            msg: 'Please provide valid passion Id or column Id',
        },
    });
};

const getAllContentsByUserSubscription = async (req, res, page, limit) => {
    const contents = await ContentDao.getAllContentsByUserSubscriptionWithPageLimit(req, res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents,
    });
};

const getTrendingSubjects = async (req, res) => {
    const subjects = await ContentDao.getTrendingSubjects();
    const names = (subjects && subjects.length) ? subjects.map(a => a.subject) : [];
    res.status(200).json({
        success: true,
        code: 200,
        data: names,
    });
};

async function getAllContentsWithWorkAndContentTitle(res, contentTitle) {
    let contents = await ContentDao.getAllContentsWithWorkByContentTitle(res, contentTitle);
    res.status(200).json(contents);
}

async function getPublicationWorks(res, page = 1, limit = 5, category) {
    const contents = await ContentDao.works(res, page, limit, category);
    res.status(200).json(contents);
}

async function getRevealedWorks(res, page = 1, limit = 5, category) {
    const contents = await ContentDao.revealedWorks(res, page, limit, category);
    res.status(200).json(contents);
}

module.exports = {
    getAllContents,
    getContentsByCategory,
    getAllContentsWithContribution,
    getAllContentsByParentId,
    getContentsById,
    getAllContentsWithWork,
    getAllReactionContentByUserId,
    getAllContentsWithContributionByPage,
    getAllReactionContentByContentId,
    getAllPromotionContentByUserId,
    getContributionsByContentTagOrUserIdWithPageLimit,
    getAllContentsByPassion,
    getAllContentsByUserSubscription,
    getAllContentsExploreByPassion,
    getAllContentsExplorePassionIdAndColumnWithPageLimit,
    getAllContentsByArtFrom,
    getAllContentsBySubject,
    getTrendingSubjects,
    getAllContentsWithWorkAndContentTitle,
    getPublicationWorks,
    getRevealedWorks
};
