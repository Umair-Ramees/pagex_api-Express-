const Content = require('../../models/Content');
const User = require('../../models/User');
const Subscription = require('../../models/Subscription');
const userDao = require('../userDao/userDao');
const utils = require('../../utils/utils');
const ContentType = require('../../contants/ContentType');
const pasionDao = require('../passionDao/pasionDao');
const mongoose = require('mongoose');
const Note = require('../../models/Note');
const Column = require('../../models/Column');

const userFieldsWithContent = 'firstname lastname fullname email profilePhoto passion';

const findAllContents = (res) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
        })
            .then((contents) => {
                resolve(contents);
            })
            .catch((err) => utils.defaultError(res, err));
    });
};
const findContent = (query) => {
    return new Promise((resolve, reject) => {
        Content.find(
            query
        )
            .then((contents) => {
                resolve(contents);
            })
            .catch((err) =>
                utils.defaultError(query, err)
            )
    });
}

const getAllContentByPageLimit = (res, page, limit) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
        })
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .populate({ path: 'user', select: userFieldsWithContent, match: { blocked: false, status: 'Active' } })
            .populate({
                path: 'parentContent',
                match: { contentDeleted: false },
            })
            .exec()
            .then(async (contents) => {
                // for(var i=0; i < contents.length; i++) {
                //     const user = await userDao.getUserById(content.userId);
                //     contents[i].user = user;
                // }

                let allContents = await findAllContents(res);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.ceil(allContents.length / limit),
                    data: contents,
                });
            })
            .catch((err) => utils.defaultError(res, err));
    });
};

const getAllContentByCategoryPageLimit = async (res, page, limit, category) => {
    limit = Number(limit) || 10
    page = Number(page) || 0
    try {
        let contents = await Content.aggregate([{
            $lookup:
            {
                from: 'pages',
                // localField: 'contentPageId',
                // foreignField: '_id',
                let: {
                    'contentPageId': '$contentPageId',
                },
                pipeline: [{ $match: { $expr: { $and: [{ $eq: ["$category", category] }, { $eq: ["$$contentPageId", "$_id"] }] } } }],
                as: 'result'
            }
        }
            ,
        {
            $match: {
                result: {
                    "$not": {
                        $size: 0
                    }
                }
            }
        }, {
            $sort: { dateOfCreation: -1 }
        }, {
            $skip: page * limit
        }, {
            $limit: limit
        }
        ]);
        let count = await Content.aggregate([{
            $lookup:
            {
                from: 'pages',
                // localField: 'contentPageId',
                // foreignField: '_id',
                let: {
                    'contentPageId': '$contentPageId',
                },
                pipeline: [{ $match: { $expr: { $and: [{ $eq: ["$category", category] }, { $eq: ["$$contentPageId", "$_id"] }] } } }],
                as: 'result'
            }
        },
        {
            $match: {
                result: {
                    "$not": {
                        $size: 0
                    }
                }
            }
        },

        {
            $count: "count"
        }
        ]);
        let total = ((count || []).at(0) || {}).count || 0
        return ({
            per_page: parseInt(limit),
            total: total,
            total_pages: Math.ceil(total / limit),
            data: contents,
        })
    } catch (err) {
        (err) => utils.defaultError(res, err)
    }
};

const findAllContentsWithContribution = (res, userId) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            user: userId,
        })
            .then((contents) => {
                resolve(contents);
            })
            .catch((err) => utils.defaultError(res, err));
    });
};

const getAllContentsWithContributionByPageLimit = (res, page, limit, userId) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            user: userId,
        })
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async (contents) => {
                let allContents = await findAllContentsWithContribution(res, userId);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.ceil(allContents.length / limit),
                    data: contents,
                });
            })
            .catch((err) => utils.defaultError(res, err));
    });
};

const getAllContentsWithContributionByPageLimitByPage = (res, page, limit, pageId) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentPageId: pageId,
        })
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async (contents) => {
                resolve({
                    per_page: parseInt(limit),
                    total: contents.length,
                    total_pages: Math.ceil(contents.length / limit),
                    data: contents,
                });
            })
            .catch((err) => utils.defaultError(res, err));
    });
};
const getAllContentsByParentId = async (res, id) => {
    let contents = await Content.find({
        contentDeleted: false,
        parentContent: id,
    })
    let users = [];

    let subUsers = [];

    for (let content of contents) {
        if (content && content._id) {
            let parentContentID = content._id;

            let subContributions = await Content.find({
                contentDeleted: false,
                parentContent: parentContentID,
            });

            for (let subContribution of subContributions) {
                if (subContribution && subContribution.user) {
                    let user = await User.findById(subContribution.user, {
                        "fullname": 1,
                        "bio": 1,
                        "profilePhoto": 1,
                        "headline": 1
                    })
                    await subUsers.push(user)
                }
            }

            let subContributionResponse = [];
            let i = 0;
            for (let user of subUsers) {
                let a = await { content: subContributions[i], userDetail: user };
                await subContributionResponse.push(a);
                i = i + 1
            }

            content['subContributions'] = subContributionResponse;
            subUsers = [];
        }
    }

    for (let content of contents) {
        if (content && content.user) {
            let user = await User.findById(content.user, { "fullname": 1, "bio": 1, "profilePhoto": 1, "headline": 1 })
            await users.push(user)
        }
    }

    let finalResponse = [];
    let i = 0;
    for (let user of users) {
        let a = await { content: contents[i], userDetail: user };
        await finalResponse.push(a);
        i = i + 1
    }
    return await finalResponse;

};

const getContentsById = async (res, id) => {
    let content = await Content.find({
        contentDeleted: false,
        _id: id,
    })
    let user = await User.findById(content[0].user, { "fullname": 1, "bio": 1, "profilePhoto": 1, "headline": 1 })
    return await { content: content, userDetail: user }
};

const findAllContentsWithWork = (res, userId) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            user: userId,
        })
            .then((contents) => {
                resolve(contents);
            })
            .catch((err) => utils.defaultError(res, err));
    });
};

const getAllContentsWithWorkByPageLimit = (res, page, limit, userId) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            user: userId,
        })
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async (contents) => {
                let allContents = await findAllContentsWithWork(res, userId);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.ceil(allContents.length / limit),
                    data: contents,
                });
            })
            .catch((err) => utils.defaultError(res, err));
    });
};

const getAllReactionContentByUserId = (userId) => {
    return Content.find(
        { contentDeleted: false, user: userId, contentType: ContentType.Reaction },
        {
            user: 1,
            parentContent: 1,
            contentDescription: 1,
            contentTag: 1,
            contentImage: 1,
            contentType: 1,
            typeOfReaction: 1,
        }
    );
};

const getAllReactionContentByContentId = async (contentId, limit, page) => {
    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }

    const whereClause = {
        contentDeleted: false,
        parentContent: contentId,
        contentType: ContentType.Reaction,
    };

    const [contents, totalRecords] = await Promise.all([
        Content.find(
            whereClause,
            {
                user: 1,
                parentContent: 1,
                contentDescription: 1,
                contentTag: 1,
                contentImage: 1,
                contentType: 1,
                typeOfReaction: 1,
            }
        ).sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .populate({ path: 'user', select: userFieldsWithContent, match: { blocked: false, status: 'Active' } }),
        Content.countDocuments(whereClause)
    ]);

    return {
        per_page: parseInt(limit),
        total: totalRecords,
        total_pages: Math.ceil(totalRecords / limit),
        data: contents,
    };
};

const getAllPromotionContentByContentId = (contenId) => {
    return Content.find(
        {
            contentDeleted: false,
            parentContent: contenId,
            contentType: ContentType.Promotion,
        },
        {
            user: 1,
            parentContent: 1,
            contentDescription: 1,
            contentType: 1,
        }
    );
};

const getAllPromotionContentByUserId = (userId) => {
    return Content.find(
        { contentDeleted: false, user: userId, contentType: ContentType.Promotion },
        {
            user: 1,
            parentContent: 1,
            contentDescription: 1,
            contentType: 1,
        }
    );
};

const getContributionsByContentTagOrUserIdWithPageLimit = async (page, limit, userId, contentTag) => {
    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }

    const whereClause = {
        contentDeleted: false,
        contentTag: { $regex: contentTag.toLowerCase(), $options: 'i' },
        contentType: ContentType.Contribution,
    };

    if (userId) {
        whereClause.user = userId;
    }

    const [contents, totalRecords] = await Promise.all([
        Content.find(whereClause)
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .populate({ path: 'user', select: userFieldsWithContent, match: { blocked: false, status: 'Active' } }),
        Content.countDocuments(whereClause),
    ]);

    return {
        per_page: parseInt(limit),
        total: totalRecords,
        total_pages: Math.ceil(totalRecords / limit),
        data: contents,
    };
};

const getContentById = (contentId) => {
    return Content.findOne({ _id: contentId, contentDeleted: false });
};

const deleteContentById = (contentId, userId) => {
    return Content.findOneAndUpdate(
        { _id: contentId, user: userId, contentDeleted: false },
        { $set: { contentDeleted: true, dateOfLastUpdate: Date.now() } },
        { new: true }
    );
};

const deleteChildContentByParentId = (parentContentId) => {
    return Content.update({ parentContent: parentContentId, contentDeleted: false }, {
        $set: {
            contentDeleted: true,
            dateOfLastUpdate: Date.now()
        }
    });
};

const editContentInfo = async (contentId, userId, data) => {
    return Content.findOneAndUpdate({ _id: contentId, user: userId, contentDeleted: false }, { $set: data }, { new: true });
};

const getAllContentsByFiltersWithPageLimit = async (filters, page, limit) => {
    // const passion = await pasionDao.getPassionById(filters.passionId);

    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }

    const match = {
        contentDeleted: false,
        'user.status': 'Active',
        'user.blocked': false,
        //'user.passion': mongoose.Types.ObjectId(filters.passionId),
    };

    if (filters.columnId) {
        match.column = mongoose.Types.ObjectId(filters.columnId);
    }

    if (filters.artFormId) {
        match['artForms.ids'] = { $in: [mongoose.Types.ObjectId(filters.artFormId)] };
    }

    if (filters.subject) {
        match.subject = { $regex: filters.subject.trim().toLowerCase(), $options: 'i' };
    }

    const queryPipline = [
        {
            $lookup: {
                localField: 'user',
                from: User.collection.name,
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $match: match,
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false,
            },
        },
    ];

    const [contents, [totalCount = { count: 0 }]] = await Promise.all([
        Content.aggregate([
            ...queryPipline,
            {
                $lookup: {
                    localField: 'parentContent',
                    from: Content.collection.name,
                    foreignField: '_id',
                    as: 'parentContent',
                },
            },
            {
                $unwind: {
                    path: '$parentContent',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    localField: 'parentContent.user',
                    from: User.collection.name,
                    foreignField: '_id',
                    as: 'parentContent.user',
                },
            },
            {
                $unwind: {
                    path: '$parentContent.user',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $sort: {
                    dateOfCreation: -1,
                },
            },
            {
                "$project": {
                    "contentDeleted": 0,
                    "user.role": 0,
                    "user.status": 0,
                    "user.blocked": 0,
                    "user.password": 0,
                    "parentContent.user.role": 0,
                    "parentContent.user.status": 0,
                    "parentContent.user.blocked": 0,
                    "parentContent.user.password": 0,
                }
            },
            {
                $skip: Number(page * limit),
            },
            {
                $limit: Number(limit),
            },
        ]).allowDiskUse(true),
        Content.aggregate([
            ...queryPipline,
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]).allowDiskUse(true),
    ]);

    // temporary workaround
    let contentObjects = [];
    for (let content of contents) {
        const notes = await Note.find({ column: content._id });
        content.noteCount = notes.length;
        contentObjects.push(content);
    }

    // const contents = await Content
    //                             .find({})
    //                             .populate("user",
    //                                 { 
    //                                     password: 0,
    //                                     role: 0,
    //                                     status: 0,
    //                                     blocked: 0, 
    //                                 })
    //                             .sort({ dateOfCreation: -1 })
    //                             .limit(Number(limit))
    //                             .skip(Number(page * limit))

    return {
        per_page: parseInt(limit),
        total: totalCount.count,
        total_pages: Math.ceil(totalCount.count / limit),
        // passion: {
        //   _id: passion._id,
        //   passionTitle: passion.passionTitle,
        // },
        // data: contents
        data: contentObjects,
    };
};

const getAllContentsByPassionWithPageLimit = async (req, res, page, limit) => {
    const user = await userDao.getUserById(req.userData.data);
    if (user && user.email) {
        return getAllContentsByFiltersWithPageLimit({}, page, limit);
    }
    return {};
};

const getAllContentsByArtFromWithPageLimit = async (req, res, page, limit) => {
    if (req.params.artFormId) {
        return getAllContentsByFiltersWithPageLimit({ artFormId: req.params.artFormId }, page, limit);
    }

    return {};
};

const getAllContentsBySubjectWithPageLimit = async (req, res, page, limit) => {
    if (req.params.subject) {
        return getAllContentsByFiltersWithPageLimit({ subject: req.params.subject }, page, limit);
    }

    return {};
};

const getAllContentsExplorePassionIdWithPageLimit = (req, res, passionId, page, limit) => {
    return getAllContentsByFiltersWithPageLimit({ passionId }, page, limit);
};

const getAllContentsExplorePassionIdAndColumnWithPageLimit = (req, res, passionId, columnId, page, limit) => {
    return getAllContentsByFiltersWithPageLimit({ passionId, columnId }, page, limit);
}

const getAllContentsByUserSubscriptionWithPageLimit = async (req, res, page, limit) => {
    if (req.userData.data) {
        if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
            limit = 10;
        }

        if (isNaN(page) || page == undefined || page === ':page') {
            page = 0;
        }

        const [contents, [totalCount = { count: 0 }]] = await Promise.all([
            Content.aggregate([
                {
                    $lookup: {
                        from: Subscription.collection.name,
                        let: { userId: '$user', isContentDeleted: '$contentDeleted' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$$isContentDeleted', false] },
                                            { $eq: ['$subscribeToUserId', '$$userId'] },
                                            { $eq: ['$user', mongoose.Types.ObjectId(req.userData.data)] },
                                        ],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    subscribeToUserId: 1,
                                },
                            },
                        ],
                        as: 'subscription',
                    },
                },
                {
                    $unwind: {
                        path: '$subscription',
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $lookup: {
                        from: User.collection.name,
                        let: { userId: '$user' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ['$_id', '$$userId'] }, { $eq: ['$status', 'Active'] }, { $eq: ['$blocked', false] }],
                                    },
                                },
                            },
                        ],
                        as: 'user',
                    },
                },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $lookup: {
                        localField: 'parentContent',
                        from: Content.collection.name,
                        foreignField: '_id',
                        as: 'parentContent',
                    },
                },
                {
                    $unwind: {
                        path: '$parentContent',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        localField: 'parentContent.user',
                        from: User.collection.name,
                        foreignField: '_id',
                        as: 'parentContent.user',
                    },
                },
                {
                    $unwind: {
                        path: '$parentContent.user',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    "$project": {
                        "contentDeleted": 0,
                        "user.role": 0,
                        "user.status": 0,
                        "user.blocked": 0,
                        "user.password": 0,
                        "parentContent.user.role": 0,
                        "parentContent.user.status": 0,
                        "parentContent.user.blocked": 0,
                        "parentContent.user.password": 0
                    }
                },
                {
                    $sort: {
                        dateOfCreation: -1,
                    },
                },
                {
                    $skip: Number(page * limit),
                },
                {
                    $limit: Number(limit),
                },
            ]).allowDiskUse(true),
            Content.aggregate([
                {
                    $lookup: {
                        from: Subscription.collection.name,
                        let: { userId: '$user', isContentDeleted: '$contentDeleted' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$$isContentDeleted', false] },
                                            { $eq: ['$subscribeToUserId', '$$userId'] },
                                            { $eq: ['$user', mongoose.Types.ObjectId(req.userData.data)] },
                                        ],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    subscribeToUserId: 1,
                                },
                            },
                        ],
                        as: 'subscription',
                    },
                },
                {
                    $unwind: {
                        path: '$subscription',
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $lookup: {
                        localField: 'user',
                        from: User.collection.name,
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $match: {
                        'user.status': 'Active',
                        'user.blocked': false,
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]).allowDiskUse(true),
        ]);

        return {
            per_page: parseInt(limit),
            total: totalCount.count,
            total_pages: Math.ceil(totalCount.count / limit),
            data: contents,
        };
    }
    return {};
};

const getTrendingSubjects = async () => {
    return Content.find({ subject: { $exists: true, $ne: "" }, contentDeleted: false }, {
        subject: 1,
        _id: 0
    }).sort({ dateOfCreation: -1 }).limit(10);
};

const getArtFormsByUser = async (userId) => {
    return Content.find({ user: userId, artForms: { $exists: true, $ne: [] }, contentDeleted: false }, {
        artForms: 1,
        _id: 0
    }).sort({ dateOfCreation: -1 }).limit(10);
}

const getContentsByArtFormID = async (artFormId, page = 0, limit = 100) => {
    if (artFormId) {
        return getAllContentsByFiltersWithPageLimit({ artFormId: artFormId }, page, limit);
    }

    return [];
};

//Handles returning auto complete data for contents when user starts typing the content title
const getAllContentsWithWorkByContentTitle = (res, contentTitle) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentType: ContentType.Work,
            contentTitle: { $regex: `${contentTitle}`, $options: 'i' }
        })
            .sort({ dateOfCreation: -1 })
            .select("_id contentTitle contentArtist artForms dateOfCreation")
            .then((contents) => {
                resolve({
                    success: true,
                    code: 200,
                    data: contents,
                })
            }).catch((err) => {
                reject(err);
            })
    })
};

const getContentBasedOnKeyword = async (keyword) => {
    return Content.find({
        $or: [
            { contentTitle: { $regex: keyword.toLowerCase(), $options: 'i' } },
            { contentDescription: { $regex: keyword.toLowerCase(), $options: 'i' } }
        ]
    })
};

const updateRevealWorkByContentId = async (contentID, userID) => {
    return Content.findOneAndUpdate({ _id: contentID }, {
        $set: {
            revealedBy: userID,
            dateOfLastUpdate: Date.now()
        }
    });
}


const queryContent = async (res, params = {}, page = 1, limit = 5) => {
    const queryPipeline = [
        {
            $match: params,
        },
        {
            $lookup: {
                localField: 'user',
                from: User.collection.name,
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            '$facet': {
                metadata: [
                    { "$count": "total" },
                ],
                data: [{ $skip: Number(page * limit) }, { $limit: Number(limit) }]
            }
        },
        {
            "$project": {
                "total": { "$arrayElemAt": ["$metadata.total", 0] },
                "data": 1,
            }
        }
    ];

    return Content.aggregate(queryPipeline)
        .then(results => {
            const _res = results[0];
            return {
                data: _res.data,
                total: _res.total,
                per_page: parseInt(limit),
                total_pages: Math.ceil(_res.total / limit),
            }
        })
        .catch(err => utils.defaultError(res, err));
}
const works = async (res, page, limit, category) => {
    const params = {
        contentDeleted: false,
        revealedBy: null,
        contentType: ContentType.Work,
    };
    if (category) {
        params["artForms.titles"] = [category]
    }
    return queryContent(res, params, page, limit);
};

const revealedWorks = async (res, page, limit, category) => {
    const params = {
        contentDeleted: false,
        revealedBy: { $ne: null },
        contentType: ContentType.Work,
    };
    if (category) {
        params["artForms.titles"] = [category]
    }
    return queryContent(res, params, page, limit)
};

module.exports = {
    findAllContents,
    getAllContentByPageLimit,
    getAllContentByCategoryPageLimit,
    findAllContentsWithContribution,
    getAllContentsWithContributionByPageLimit,
    getAllContentsWithContributionByPageLimitByPage,
    findAllContentsWithWork,
    getAllContentsWithWorkByPageLimit,
    getAllReactionContentByUserId,
    getAllReactionContentByContentId,
    getAllPromotionContentByContentId,
    getAllPromotionContentByUserId,
    getContributionsByContentTagOrUserIdWithPageLimit,
    getContentById,
    deleteContentById,
    editContentInfo,
    getAllContentsByPassionWithPageLimit,
    deleteChildContentByParentId,
    getAllContentsByUserSubscriptionWithPageLimit,
    getAllContentsExplorePassionIdWithPageLimit,
    getAllContentsExplorePassionIdAndColumnWithPageLimit,
    getAllContentsByArtFromWithPageLimit,
    getAllContentsBySubjectWithPageLimit,
    getTrendingSubjects,
    getArtFormsByUser,
    getContentsByArtFormID,
    getAllContentsByParentId,
    getContentsById,
    findContent,
    getAllContentsWithWorkByContentTitle,
    getContentBasedOnKeyword,
    updateRevealWorkByContentId,
    works,
    revealedWorks,
};
