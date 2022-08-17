const contentService = require('../services/contentService/index');
const jwt = require('jsonwebtoken');

createNewContent = (req, res, next) => {
    contentService.createNewContentService.createNewContent(req, req.body, res);
};

createNewContentWithContribution = (req, res, next) => {
    contentService.createNewContentService.createNewContentWithContribution(req, req.body, res);
};

editContentWithContribution = (req, res, next) => {
    contentService.createNewContentService.editContentWithContribution(req, req.body, res);
};

createNewContentWithWork = (req, res, next) => {
    contentService.createNewContentService.createNewContentWithWork(req, req.body, res);
};

getAllContents = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;

    contentService.getAllContentService.getAllContents(res, page, limit);
};

getContentsByCategory = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let category = req.params.category
    contentService.getAllContentService.getContentsByCategory(res, page, limit, category);
};

getAllContentsWithContribution = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let userId = req.params.userId;
    contentService.getAllContentService.getAllContentsWithContribution(res, page, limit, userId);
};

getAllContentsWithContributionByPage = (req, res, next) => {
    let limit = req.params.limit; 
    let page = req.params.page;
    let pageId = req.params.pageId;
    contentService.getAllContentService.getAllContentsWithContributionByPage(res, page, limit, pageId);
};

getAllContentsByParentId = (req, res, next) => {

    let id = req.params.id;
    contentService.getAllContentService.getAllContentsByParentId(res, id);
};
getContentsById = (req, res, next) => {

    let id = req.params.id;
    contentService.getAllContentService.getContentsById(res, id);
};

getAllContentsWithWork = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let userId = req.params.userId;
    contentService.getAllContentService.getAllContentsWithWork(res, page, limit, userId);
};

const createNewContentWithReaction = (req, res, next) => {
    contentService.createNewContentService.createNewContentWithReaction(req, req.body.data, res);
};

const getAllReactionContentByContentId = (req, res, next) => {
    return contentService.getAllContentService.getAllReactionContentByContentId(req, res);
};

const getAllReactionContentByUserId = (req, res, next) => {
    return contentService.getAllContentService.getAllReactionContentByUserId(req, req.params.userId, res);
};

const createNewContentWithPromotion = (req, res, next) => {
    contentService.createNewContentService.createNewContentWithPromotion(req, req.body.data, res);
};

const getAllPromotionContentByUserId = (req, res, next) => {
    return contentService.getAllContentService.getAllPromotionContentByUserId(req, req.params.userId, res);
};

const getContributionsByContentTagOrUserIdWithPageLimit = (req, res, next) => {
    return contentService.getAllContentService.getContributionsByContentTagOrUserIdWithPageLimit(
        req,
        req.params.page,
        req.params.limit,
        req.body.userId,
        req.body.contentTag,
        res
    );
};

const deleteContentByIdAndUserId = (req, res, next) => {
    return contentService.createNewContentService.deleteContentByIdAndUserId(req, req.params.contentId, req.params.userId, res);
};

const getAllContentsByPassion = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;

    return contentService.getAllContentService.getAllContentsByPassion(req, res, page, limit);
};

const getAllContentsByArtFrom = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;

    return contentService.getAllContentService.getAllContentsByArtFrom(req, res, page, limit);
};

const getAllContentsBySubject = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;

    return contentService.getAllContentService.getAllContentsBySubject(req, res, page, limit);
}

const getAllContentsByUserSubscription = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;
    return contentService.getAllContentService.getAllContentsByUserSubscription(req, res, page, limit);
};

const getAllContentsExploreByPassion = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;

    return contentService.getAllContentService.getAllContentsExploreByPassion(req, res, page, limit);
};

const getAllContentsExplorePassionIdAndColumn = (req, res, next) => {
    const limit = req.params.limit;
    const page = req.params.page;

    return contentService.getAllContentService.getAllContentsExplorePassionIdAndColumnWithPageLimit(req, res, page, limit);
};

const getTrendingSubjects = (req, res) => {
    return contentService.getAllContentService.getTrendingSubjects(req, res);
};

const getAllContentsWithWorkByContentTitle = (req, res) => {
    let contentTitle = req.params.contentTitle;
    return contentService.getAllContentService.getAllContentsWithWorkAndContentTitle(res, contentTitle);
};

const updateRevealWorkByContentId = async (req, res) => {
    const { userId, contentId } = req.params;
    return contentService.updateContentService
        .updateRevealWorkByContentIdService(res, contentId, userId);
}

const getPublicationWorks = async (req, res) => {
    const { page, limit, category } = req.query;
    return contentService.getAllContentService
        .getPublicationWorks(res, page, limit, category);
}

const getRevealedWorks = async (req, res) => {
    const { page, limit, category } = req.query;
    return contentService.getAllContentService
        .getRevealedWorks(res, page, limit, category);
}

module.exports = {
    getAllContents,
    getContentsByCategory,
    getAllContentsWithContribution,
    getAllContentsWithContributionByPage,
    getAllContentsWithWork,
    createNewContent,
    createNewContentWithContribution,
    editContentWithContribution,
    createNewContentWithWork,
    createNewContentWithReaction,
    createNewContentWithPromotion,
    getAllReactionContentByContentId,
    getAllReactionContentByUserId,
    getAllPromotionContentByUserId,
    getContributionsByContentTagOrUserIdWithPageLimit,
    deleteContentByIdAndUserId,
    getAllContentsByPassion,
    getAllContentsByUserSubscription,
    getAllContentsExploreByPassion,
    getAllContentsExplorePassionIdAndColumn,
    getAllContentsByArtFrom,
    getAllContentsBySubject,
    getTrendingSubjects,
    getAllContentsByParentId,
    getContentsById,
    getAllContentsWithWorkByContentTitle,
    updateRevealWorkByContentId,
    getPublicationWorks,
    getRevealedWorks,
};
