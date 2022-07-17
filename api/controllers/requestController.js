const requestService = require('../services/requestService/index');


const replyUserReceivedRequest = async (req, res, next) => await requestService.replyUserReceivedRequest(req.params.requestId, req.userData.data, req.body, req.files && req.files.length > 0 ? req.files[0].path : '', res);
const deleteUserSentRequest = async (req, res, next) => await requestService.deleteUserSentRequest(req.params.requestId, req.userData.data, res);
const getUserReceivedRequests = async (req, res, next) => await requestService.getUserReceivedRequests(req.userData.data, res);
const getUserSentRequests = async (req, res, next) => await requestService.getUserSentRequests(req.userData.data, res);
const createNewUserRequest = async (req, res, next) => await requestService.createNewUserRequest(req.userData.data, req.body, res);




module.exports = {
    replyUserReceivedRequest,
    deleteUserSentRequest,
    getUserReceivedRequests,
    getUserSentRequests,
    createNewUserRequest
};