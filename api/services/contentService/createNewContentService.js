const userDao = require('../../daos/userDao/userDao');
const contentDao = require('../../daos/contentDao/contentDao');
const columnDao = require('../../daos/columnDao/columnDao');
const Content = require('../../models/Content');
const ContentClass = require('../../class/ContentClass');
const utils = require('../../utils/utils');
const ContentType = require('../../contants/ContentType');
const {createArtFromsIfNeed} = require('../artFormService/index');
const mongoose = require('mongoose');

async function createNewContent(req, data, res) {
    if (utils.isUserAuthorized(req, data.contentUserId, res)) {
        // User validation
        if ((await userDao.ifExistUserAccountById(data.contentUserId)) > 0) {
            // TODO VALIDATE PASSION BY ID
            let photo = req.files && req.files.length > 0 ? req.files[0].path : '';
            let contentData = await Content(await ContentClass.createNewContent(data, photo));
            contentData
                .save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        data: {
                            msg: 'Content created with success',
                        },
                        code: 200,
                    });
                })
                .catch((err) => utils.defaultError(res, err));
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

async function createNewContentWithContribution(req, data, res) {
    if (utils.isUserAuthorized(req, data.contentUserId, res)) {
        // User validation
        if ((await userDao.ifExistUserAccountById(data.contentUserId)) > 0) {
            if (data.columnId && data.columnId.trim() != '') {
                if (!await columnDao.isColumnExits(data.contentUserId, data.columnId)) {
                    res.status(406).json({
                        success: true,
                        data: {
                            msg: 'Column does not exists, please provide valid column id',
                        },
                        code: 406,
                    });
                }
            }
            // TODO VALIDATE PASSION BY ID
            let photo = req.files && req.files.length > 0 ? req.files[0].path : '';
            // Creating artFroms if needed
            const artForms = {ids: [], titles: []};
            if (data.artForms && data.artForms.length > 0) {
                const artFormsRecived = await createArtFromsIfNeed(data.artForms);
                artForms.ids = Array.from(artFormsRecived.map(a => mongoose.Types.ObjectId(a._id)));
                artForms.titles = Array.from(artFormsRecived.map(a => a.title));

            }

            let content = await Content(ContentClass.createNewContentWithContribution(data, photo, artForms));
            content
                .save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        data: {
                            msg: 'Content(Contribution) created with success',
                        },
                        code: 200,
                    });
                })
                .catch((err) => utils.defaultError(res, err));
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

async function editContentWithContribution(req, data, res) {
    if (utils.isUserAuthorized(req, data.contentUserId, res)) {
        try {
            const user = await userDao.getUserById(data.contentUserId);
            if (user != null) {
                const oldContent = await contentDao.getContentById(data.contentId);
                if (oldContent != null && oldContent.contentType === ContentType.Contribution) {
                    const photo = req.files && req.files.length > 0 ? req.files[0].path : oldContent.contentImage;

                    // edit artFroms if needed
                    const artForms = {ids: [], titles: []};
                    if (data.artForms && data.artForms.length > 0) {
                        const artFormsRecived = await createArtFromsIfNeed(data.artForms);
                        artForms.ids = Array.from(artFormsRecived.map(a => mongoose.Types.ObjectId(a._id)));
                        artForms.titles = Array.from(artFormsRecived.map(a => a.title));
                    }

                    const content = await contentDao.editContentInfo(data.contentId, data.contentUserId, {
                        contentDescription: data.contentDescription,
                        contentTag: data.contentTag,
                        contentImage: photo,
                        dateOfLastUpdate: Date.now(),
                        subject: data.subject,
                        artForms: artForms
                    });

                    // deleting old file
                    if (!(content.contentImage === oldContent.contentImage)) {
                        utils.deleteFile(oldContent.contentImage);
                    }

                    return res.status(200).json({
                        success: true,
                        data: {
                            contentId: content._id,
                            contentUserId: content.user,
                            contentDescription: content.contentDescription,
                            contentTag: content.contentTag,
                            contentImage: content.contentImage,
                            dateOfCreation: content.dateOfCreation,
                            dateOfLastUpdate: content.dateOfLastUpdate,
                            artForms: content.artForms,
                            subject: content.subject,
                        },
                        code: 200,
                    });
                } else {
                    return res.status(406).json({
                        success: false,
                        data: {
                            msg: 'Invalid content id',
                        },
                        code: 406,
                    });
                }
            } else {
                return res.status(406).json({
                    success: false,
                    data: {
                        msg: 'This account does not exist',
                    },
                    code: 406,
                });
            }
        } catch (error) {
            console.error('Error occured while editing content info', error);
            return res.status(500).json({
                success: false,
                data: {
                    msg: 'Error occured occured while performing edit request',
                },
                code: 500,
            });
        }
    }
}

async function createNewContentWithWork(req, data, res) {
    
    if (utils.isUserAuthorized(req, data.contentUserId, res)) {
        // User validation
        if ((await userDao.ifExistUserAccountById(data.contentUserId)) > 0) {
            // TODO VALIDATE PASSION BY ID
            let photo = req.files && req.files.length > 0 ? req.files[0].path : '';
            const artForms = {ids: [], titles: []};
            let artFormss = await data.artForms ? [data.artForms] : [];
            if (artFormss && artFormss.length > 0) {
                const artFormsRecived = await createArtFromsIfNeed(artFormss);
                artForms.ids = Array.from(artFormsRecived.map(a => mongoose.Types.ObjectId(a._id)));
                artForms.titles = Array.from(artFormsRecived.map(a => a.title));
            }
            let content = await Content(await ContentClass.createNewContentWithWork(data, photo, artForms));
            content
                .save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        data: {
                            msg: 'Content(Work) created with success',
                        },
                        code: 200,
                    });
                })
                .catch((err) => utils.defaultError(res, err));
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

async function createNewContentWithReaction(req, data, res) {
    if (utils.isUserAuthorized(req, data.userId, res)) {
        // User validation
        const user = await userDao.getUserById(data.userId);
        if (user != null) {
            // TODO validation of content type
            let photo = req.files && req.files.length > 0 ? req.files[0].path : '';
            let content = await Content(await ContentClass.createNewContentWithReaction(data, photo));
            content
                .save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        data: {
                            msg: 'Content(Reaction) created with success',
                        },
                        code: 200,
                    });
                })
                .catch((err) => utils.defaultError(res, err));
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

async function increamentPromotionCount(parentContent) {
    return await Content.findOneAndUpdate(
        {
            _id: parentContent,
            contentDeleted: false,
            $and: [
                {
                    $or: [{contentType: ContentType.Contribution}, {contentType: ContentType.Work}, {contentType: ContentType.Reaction}],
                },
            ],
        },
        {$inc: {promotionCount: 1}},
        {new: true}
    );
}

async function createNewContentWithPromotion(req, data, res) {
    if (utils.isUserAuthorized(req, data.userId, res)) {
        // User validation
        if ((await userDao.getUserById(data.userId)) != null) {
            const parentContent = await contentDao.getContentById(data.contentId);
            if (
                parentContent != null &&
                (parentContent.contentType === ContentType.Contribution ||
                parentContent.contentType === ContentType.Reaction ||
                parentContent.contentType === ContentType.Work)
            ) {
                const content = await Content(await ContentClass.createNewContentWithPromotion(data));
                content
                    .save()
                    .then((response) => {
                        increamentPromotionCount(data.contentId).then();
                        res.status(200).json({
                            success: true,
                            data: {
                                msg: 'Content(Promotion) created with success',
                            },
                            code: 200,
                        });
                    })
                    .catch((err) => utils.defaultError(res, err));
            } else {
                res.status(406).json({
                    success: true,
                    data: {
                        msg: 'Invalid content, promotion is only alowed on (Contribution, Work and Reaction)',
                    },
                    code: 406,
                });
            }
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

const deleteContentByIdAndUserId = async (req, contentId, userId, res) => {
    if (utils.isUserAuthorized(req, userId, res)) {
        const [result] = await Promise.all([contentDao.deleteContentById(contentId, userId), contentDao.deleteChildContentByParentId(contentId)]);

        if (result && result.contentDeleted) {
            return res.status(200).json({
                success: true,
                data: {
                    msg: `${result.contentType} is deleted succesffully`,
                },
                code: 200,
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                msg: 'Invalid content',
            },
            code: 406,
        });
    }
};
module.exports = {
    createNewContent,
    createNewContentWithContribution,
    editContentWithContribution,
    createNewContentWithWork,
    createNewContentWithReaction,
    createNewContentWithPromotion,
    deleteContentByIdAndUserId,
};
