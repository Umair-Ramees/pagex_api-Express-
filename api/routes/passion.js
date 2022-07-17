var express = require('express');
const router = express.Router();
const passionController = require('../controllers/passionController');
//=> End of declared dependencies

// @desc    Fetch all pasison by pagination
// @route   POST /api/v1/passion/all/limit/:limit/page/:page
// @access  private
router.get('/all/limit/:limit/page/:page', passionController.getAllpassions)

module.exports = router;