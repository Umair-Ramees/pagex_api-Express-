const Request = require('../../models/Request');
const { ObjectId } = require('mongoose').Types
const updateRequest = async (requestId, reply) => {
    return await Request.findByIdAndUpdate(requestId,
        {
            $set: {
                dateOfLastUpdate: new Date(),
                status: reply ? 'ACCEPTED' : 'REFUSED'
            }
        })
}
const deleteRequest = async (requestId) => {
    return await Request.findByIdAndDelete(requestId)

}
const getRequest = async (requestId) => {
    return await Request.findById(requestId)
}
const createRequest = async (userId, requestedUserId, contentId, message) => {
    let request = new Request({
        user: ObjectId(userId),
        requestedUser: ObjectId(requestedUserId),
        content: ObjectId(contentId),
        message
    })
    return await request.save()
}
const getListActiveRequestsForUser = async (requestedUserId) => {
    return await Request.find({
        requestedUser: ObjectId(requestedUserId),
        status: { $eq: 'PENDING' }
    })
}
const getListSentRequestsFromUser = async (userId) => {
    return await Request.find({
        user: ObjectId(userId)
    })
}

module.exports = {
    updateRequest,
    deleteRequest,
    getRequest,
    createRequest,
    getListActiveRequestsForUser,
    getListSentRequestsFromUser,
};