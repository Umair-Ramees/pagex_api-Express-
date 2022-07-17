var express = require("express");
const authCheck = require("../middleware/check-auth");
const multer = require("../middleware/FileUpload");
const pageController = require("../controllers/pageController");
// const contentContributionsController = require("../controllers/contentContributionsController");

const router = express.Router();

router.post(
  "/add-page",
  authCheck,
  multer.upload.any(),
  pageController.addNewPage
);
router.get("/get-pages", authCheck, pageController.getAllPages);
router.get("/get-page/:category", authCheck, pageController.getPage);
router.get("/get-page/user/:user", authCheck, pageController.getPageByUserId);
router.get(
  "/subscriptions/list/userId/:userId",
  authCheck,
  pageController.getUserSubscriptionPages
);

//TODO add multer middleware for image upload to the edit route
router.patch(
  "/edit-page/:id",
  authCheck,
  multer.upload.any(),
  pageController.editPage
);
router.delete("/delete-page/:id", authCheck, pageController.deletePage);
// router.patch(
//   "/edit-content-contributions/:id",

//   contentContributionsController.editContentContributions
// );
// router.delete(
//   "/delete-content-contributions/:id",

//   contentContributionsController.deleteContentContributions
// );
module.exports = router;
