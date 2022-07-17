var express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require('../middleware/FileUpload');
const authCheck = require('../middleware/check-auth');
//=> End of declared dependencies

// @desc    Create new content
// @route   POST /api/v1/content/new
// @access  private
router.post('/new', authCheck, multer.upload.any(), contentController.createNewContent);

// @desc    Fetch all content by pagination
// @route   POST /api/v1/content/all/limit/:limit/page/:page
// @access  private
router.get('/all/limit/:limit/page/:page', contentController.getAllContents);
router.get('/category/:category/limit/:limit/page/:page/', contentController.getContentsByCategory);
// @desc    Create new content contribution
// @route   POST /api/v1/content/contribution/new
// @access  private
router.post('/contribution/new', authCheck, multer.upload.any(), contentController.createNewContentWithContribution);

// @desc    Fetch all content by pagination
// @route   POST /api/v1/content/all/limit/:limit/page/:page
// @access  private
router.get('/contribution/all/limit/:limit/page/:page/user/:userId', contentController.getAllContentsWithContribution);
router.get('/contribution/all/limit/:limit/page/:page/pageId/:pageId', contentController.getAllContentsWithContributionByPage);
router.get('/getAllContentsByParentId/:id', contentController.getAllContentsByParentId);
router.get('/getContenstById/:id', contentController.getContentsById);

// @desc    Create new content contribution
// @route   POST /api/v1/contentcontribution/new
// @access  private
router.post('/work/new', authCheck, multer.upload.any(), contentController.createNewContentWithWork);

// @desc    Update Reveal work content
// @route   PUT /api/v1/content/work/userId/:userId/reveal/:contentId
// @access  private
router.put('/work/userId/:userId/reveal/:contentId', authCheck, contentController.updateRevealWorkByContentId)

// @desc    Fetch all content by pagination and category for Publication Page
// @route   GET /api/v1/content/works?page=1&limit=5&category=filmmaker
// @access  private
router.get('/works', authCheck, contentController.getPublicationWorks);

// @desc    Fetch all content by pagination and category for HomePage Page
// @route   GET /api/v1/content/revealedWorks?page=1&limit=5&category=filmmaker
// @access  private
router.get('/revealedWorks', authCheck, contentController.getRevealedWorks);

// @desc    Fetch all works by category
// @route   GET /api/v1/content/work
// @access  private
router.get('/work/all/limit/:limit/page/:page/user/:userId', authCheck, contentController.getAllContentsWithWork);

// @desc    Create new content reaction
// @route   POST /api/v1/content/reaction/new
// @access  private
router.post('/reaction/new', authCheck, contentController.createNewContentWithReaction);

router.get('/reaction/list/contentId/:contentId/limit/:limit/page/:page', authCheck, contentController.getAllReactionContentByContentId);

router.get('/reaction/list/userId/:userId', authCheck, contentController.getAllReactionContentByUserId);

// @desc    Create new content promotion
// @route   POST /api/v1/content/promotion/new
// @access  private
router.post('/promotion/new', authCheck, contentController.createNewContentWithPromotion);

router.get('/promotion/list/userId/:userId', contentController.getAllPromotionContentByUserId);

router.post('/contribution/all/tag/limit/:limit/page/:page', contentController.getContributionsByContentTagOrUserIdWithPageLimit);

router.delete('/contribution/contentId/:contentId/user/:userId', authCheck, contentController.deleteContentByIdAndUserId);

router.delete('/work/contentId/:contentId/user/:userId', authCheck, contentController.deleteContentByIdAndUserId);

// @desc    Edit content contribution
// @route   POST /api/v1/content/contribution/new
// @access  private
router.post('/contribution/edit', authCheck, multer.upload.any(), contentController.editContentWithContribution);

router.get('/feed/user/passion/limit/:limit/page/:page', authCheck, contentController.getAllContentsByPassion);
router.get('/feed/user/subscription/limit/:limit/page/:page', authCheck, contentController.getAllContentsByUserSubscription);
router.get('/feed/art-form/id/:artFormId/limit/:limit/page/:page', authCheck, contentController.getAllContentsByArtFrom);
router.get('/feed/subject/:subject/limit/:limit/page/:page', authCheck, contentController.getAllContentsBySubject);

router.get('/explore/passionId/:passion/limit/:limit/page/:page', authCheck, contentController.getAllContentsExploreByPassion);
router.get('/explore/passionId/:passion/columnId/:column/limit/:limit/page/:page', authCheck, contentController.getAllContentsExplorePassionIdAndColumn);

router.get('/trending/subjects', authCheck, contentController.getTrendingSubjects);

router.get('/work/all/searchphrase/:contentTitle', contentController.getAllContentsWithWorkByContentTitle);

module.exports = router;
