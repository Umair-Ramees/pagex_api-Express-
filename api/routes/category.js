var express = require('express');
const router = express.Router();
const authCheck = require('../middleware/check-auth');
const categoryController = require('../controllers/categoryController');
//=> End of declared dependencies

// @desc    create a new request
// @route   POST /api/v1/category/add
// @access  Private
router.post('/add', authCheck, categoryController.createNewCategory);
router.post('/set_current_category',authCheck, categoryController.setCurrentCategory);
// @desc    Get user sent requests
// @route   GET /api/v1/categories
// @access  Private
router.get('/get', categoryController.getCategories);

module.exports = router;