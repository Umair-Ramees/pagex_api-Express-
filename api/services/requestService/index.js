const mongoose = require('mongoose');
const requestDao = require('../../daos/requestDao/requestDao');
const Content = require('../../models/Content');
const Page = require('../../models/page');
const Column = require('../../models/Column');

const replyUserReceivedRequest = async (requestId, userId, data, photo, res) => {
    try {
        let request = await requestDao.getRequest(requestId)
        let { isAccepted, contribution } = data
        if (request.requestedUser._id.toString() == userId.toString()) {
            if (request.status != 'PENDING') {
                return res.status(201).json({
                    success: true,
                    data: {
                        msg: 'The request has already been replied to',
                    },
                    code: 201
                })
            }
            if (isAccepted) {
                try {
                    let page = await Page.findOne({ user: request.requestedUser._id })
                    let column = await Column.findOne({ user: request.requestedUser._id })
                    if (!page) {
                        page = Page({
                            _id: new mongoose.Types.ObjectId,
                            user: request.requestedUser._id,
                            title: 'Recommendations',
                            category: 'Recommendations',
                            description: 'Recommendations',
                            image: photo || "image not found"
                        })
                        await page.save()
                    }
                    if (!column) {
                        column = Column({
                            _id: new mongoose.Types.ObjectId,
                            user: request.requestedUser._id,
                            description: request.content.contentDescription,
                            subject: request.content.subject,
                        })
                        await column.save()
                    }
                    let content = Content({
                        _id: new mongoose.Types.ObjectId,
                        user: request.requestedUser._id,
                        contentType: 'Contribution',
                        contentTitle: contribution.title || contribution.contentTitle || request.content.contentTitle || '',
                        contentDescription: contribution.description || contribution.contentDescription || request.content.contentDescription || '',
                        contentImage: photo,
                        parentContent: request.content._id,
                        contentPageId: page._id,
                        artForms: request.content.artForms,
                        subject: request.content.subject,
                        contentTag: request.content.contentTag,
                        column: column._id
                    })
                    await content.save()
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        data: {
                            msg: 'Malformed request',
                        },
                        code: 400
                    })
                }
            }
            await requestDao.updateRequest(requestId, isAccepted)

            return res.status(200).json({
                success: true,
                data: {
                    msg: 'Replied to request successfully',
                },
                code: 200
            })
        } else {
            return res.status(404).json({
                success: false,
                data: {
                    msg: 'Unauthorized access',
                },
                code: 404
            })
        }
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }
}
const deleteUserSentRequest = async (requestId, userId, res) => {
    try {
        let request = await requestDao.getRequest(requestId)
        if (request.user._id.toString() == userId.toString()) {
            await requestDao.deleteRequest(requestId)
            return res.status(200).json({
                success: true,
                data: {
                    msg: 'Request deleted successfully',
                },
                code: 200
            })
        } else {
            return res.status(404).json({
                success: true,
                data: {
                    msg: 'Unauthorized access',
                },
                code: 404
            })
        }
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }
}
const getUserReceivedRequests = async (userId, res) => {
    try {
        let requests = await requestDao.getListActiveRequestsForUser(userId);
        return res.status(200).json({
            success: true,
            data: {
                msg: 'Requests retrieved successfully',
                requests: requests
            },
            code: 200
        })
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }
}
const getUserSentRequests = async (userId, res) => {
    try {
        let requests = await requestDao.getListSentRequestsFromUser(userId);
        return res.status(200).json({
            success: true,
            data: {
                msg: 'Requests retrieved successfully',
                requests: requests
            },
            code: 200
        })
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }

}
const createNewUserRequest = async (userId, data, res) => {
    try {
        let { contentId, requestedUserId, message } = data;
        if (requestedUserId == userId) {
            return res.status(403).json({
                success: true,
                data: {
                    msg: 'Self request not allowed',
                },
                code: 403
            })
        }
        let senderRequestsCount = (await requestDao.getListSentRequestsFromUser(userId)).length
        let receiverRequestsCount = (await requestDao.getListActiveRequestsForUser(requestedUserId)).length
        if (senderRequestsCount >= 20) {
            return res.status(401).json({
                success: true,
                data: {
                    msg: 'Maximum number of outgoing requests from user reached',
                },
                code: 401
            })
        }
        if (receiverRequestsCount >= 20) {
            return res.status(402).json({
                success: true,
                data: {
                    msg: 'Maximum number of ingoing requests for requested user reached, please try later',
                },
                code: 402
            })
        }
        await requestDao.createRequest(userId, requestedUserId, contentId, message)
        return res.status(200).json({
            success: true,
            data: {
                msg: 'Request created successfully',
            },
            code: 200
        })
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }
}



module.exports = {
    replyUserReceivedRequest,
    deleteUserSentRequest,
    getUserReceivedRequests,
    getUserSentRequests,
    createNewUserRequest
};
