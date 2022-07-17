var express = require('express');
const router = express.Router();
const authCheck = require('../middleware/check-auth');
const requestController = require('../controllers/requestController');
const multer = require('../middleware/FileUpload');
//=> End of declared dependencies

// @desc    create a new request
// @route   POST /api/v1/request
// @access  Private
router.post('/request', authCheck, requestController.createNewUserRequest);

// @desc    Get user sent requests
// @route   GET /api/v1/sentRequests
// @access  Private
router.get('/sent-requests', authCheck, requestController.getUserSentRequests);

// @desc    Get user received requests
// @route   GET /api/v1/receivedRequests
// @access  Private
router.get('/received-requests', authCheck, requestController.getUserReceivedRequests);

// @desc    Delete user sent request
// @route   DELETE /api/v1/request/:requestId
// @access  Private
router.delete('/request/:requestId', authCheck, requestController.deleteUserSentRequest);

// @desc    Reply to user received request
// @route   GET /api/v1/request/:requestId
// @access  Private
router.put('/request/:requestId', authCheck, multer.upload.any(), requestController.replyUserReceivedRequest);

module.exports = router;