var express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');
const multer = require('../middleware/FileUpload');
const authCheck = require('../middleware/check-auth');


router.get('/all/limit/:limit/page/:page', authCheck, columnController.getAllColumnsWithPageLimit);
router.get('/:columnId', columnController.getColumnById);
// router.post('/new', authCheck, columnController.createNewColumn);
// router.post('/new', authCheck, columnController.createNewColumn);
// router.post('/new', authCheck, columnController.createNewColumn);
router.post('/new', authCheck, multer.upload.any(), columnController.createNewColumn);
router.delete('/remove', authCheck, columnController.removeColumn);

router.get('/forms/all/passion/:passionId/limit/:limit/page/:page', authCheck, columnController.getlistOfUniqueArtFormsWithPageLimit);
router.get('/all/passion/:passionId/form/:form/limit/:limit/page/:page', authCheck, columnController.getlistOfColumnsByPassionAndFormWithPageLimit);

// @desc    Create new column promotion
// @route   POST /api/v1/column/promotion/new
// @access  private
router.post('/promotion/new', authCheck, columnController.createNewColumnWithPromotion);

router.get('/promotion/list', columnController.getAllPromotionColumn);

// @desc Add column not
// @route POST /api/v1/column/note/new
router.post('/note/new', authCheck, columnController.createNewNote)
// router.post('/note/new', authCheck, columnController.createNewNote)

module.exports = router;