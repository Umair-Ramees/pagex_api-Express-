var express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('../middleware/FileUpload');
const authCheck = require('../middleware/check-auth');
//=> End of declared dependencies

// @desc    Signup new user
// @route   POST /api/v1/users/signup
// @access  Public
router.post('/signup', multer.upload.any(), userController.createNewAccount);
router.post('/signup-google', userController.createNewAccountGoogle);


// @desc    Validate email account
// @route   POST /api/v1/users/validate/account
// @access  Public
router.post('/validate/account', userController.validateAccount);

// @desc    Check if email validation code is valid
// @route   POST /api/v1/users/validate/code
// @access  Public
router.post('/validate/code', userController.isCodeValid);

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
router.post('/login', userController.loginUser);
router.post('/login-google', userController.loginUserGoogle);

router.post('/subscription/create', authCheck, userController.createNewSubscription);
router.delete('/subscription/remove', authCheck, userController.removeSubscription);
router.get('/subscription/status/subscribeToUserId/:subscribeToUserId', authCheck, userController.subscriptionStatus);
router.get('/subscription/list/userId/:userId', authCheck, userController.getListOfSubcribtions);
router.get('/subscriber/list/userId/:userId', authCheck, userController.getListOfSubcribers);

router.get('/info/userId/:userId', authCheck, userController.getUserInfo);

router.post('/info/edit', authCheck, multer.upload.any(), userController.editUserInfo);

router.get('/reaction/contentId/:contentId/limit/:limit/page/:page', authCheck, userController.getListOfUsersWhoDidReaction);
router.get('/promotion/contentId/:contentId', userController.getListOfUsersWhoDidPromotion);

router.patch('/affiliation/:userId', authCheck, userController.updateUserAffiliationAndOrganization)
router.get('/explore/passionId/:passion/limit/:limit/page/:page', authCheck, userController.getUsersExploreFeedWithPageLimit);
router.get('/search/keywords', authCheck, userController.getSearchResultsBasedOnKeywords);

router.get('/validate/account', (req, res, next) => {
  res.send('test get API');
});

module.exports = router;