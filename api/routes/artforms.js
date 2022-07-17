var express = require('express');
const authCheck = require('../middleware/check-auth');
const router = express.Router();
const artFormController = require('../controllers/artfromController');
//=> End of declared dependencies

// // @desc    Fetch all pasison by pagination
// // @route   POST /api/v1/passion/all/limit/:limit/page/:page
// // @access  private
// router.get('/all/limit/:limit/page/:page', artFormController.getAllpassions)
router.get('/search/title/:title', authCheck, artFormController.searchArtFormByTitle);
router.get('/activity/user', authCheck, artFormController.getArtFormsByUser);
router.post('/artform/works', artFormController.getWorksByArtform);
router.get('/artform/:artformId/contents', authCheck, artFormController.getContributionContentByArtform);
router.get('/recentWorksandContributions', artFormController.getRecentWorksandContributionsByArtForm);
router.get('/all', authCheck, artFormController.getAllArtForms);


module.exports = router;
