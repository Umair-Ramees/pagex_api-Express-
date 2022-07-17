const userService = require("../services/userServices/index");

const createNewAccount = (req, res, next) => {
  userService.createNewAccountService.addNewUser(req, req.body, res);
};

const createNewAccountGoogle = (req, res, next) => {
  userService.createNewAccountService.addNewUser(req, req.body, res, true);
};

const validateAccount = (req, res, next) => {
  userService.validateEmailAccount.validateEmailAccount(req.body.data, res);
};

const isCodeValid = (req, res, next) => {
  userService.isCodeValidService.isCodeValid(req.body.data, res);
};

const loginUser = (req, res, next) => {
  userService.userLoginService.userLogin(req.body.data, res);
};

const loginUserGoogle = (req, res, next) => {
  userService.userLoginService.userLoginGoogle(req, req.body.data, res);
};

const createNewSubscription = async (req, res, next) => {
  return userService.createSubscription(req, req.body.data, res);
};

const removeSubscription = async (req, res, next) => {
  return userService.removeSubscription(req, req.body.data, res);
};

const subscriptionStatus = async (req, res, next) => {
  return userService.subscriptionStatus(req, req.params.userId, res);
};

const getListOfSubcribers = (req, res, next) => {
  return userService.getListOfSubscibers(req.params.userId, res);
};

const getListOfSubcribtions = (req, res, next) => {
  return userService.getListOfSubscibtions(req.params.userId, res);
};
const getUserInfo = (req, res, next) => {
  return userService.getUserInfo(req, req.params.userId, res);
};

const getListOfUsersWhoDidReaction = (req, res, next) => {
  return userService.getListOfUsersWhoDidReaction(req, res);
};

const getListOfUsersWhoDidPromotion = (req, res, next) => {
  return userService.getListOfUsersWhoDidPromotion(req.params.contentId, res);
};

const editUserInfo = (req, res, next) => {
  return userService.editUserInfo(req, req.body.data, res);
};

const getUsersExploreFeedWithPageLimit = (req, res, next) => {
  return userService.getUsersExploreFeedWithPageLimit(req, res);
};

const getSearchResultsBasedOnKeywords = (req, res, next) => {
  return userService.getSearchResultsBasedOnKeywords(req, res);
};

const updateUserAffiliationAndOrganization = (req, res) => {
  return userService.setUserAffiliation(req, res);
};

module.exports = {
  createNewAccount,
  createNewAccountGoogle,
  validateAccount,
  isCodeValid,
  loginUser,
  loginUserGoogle,
  createNewSubscription,
  removeSubscription,
  getListOfSubcribers,
  getListOfSubcribtions,
  getUserInfo,
  getListOfUsersWhoDidReaction,
  getListOfUsersWhoDidPromotion,
  editUserInfo,
  getUsersExploreFeedWithPageLimit,
  subscriptionStatus,
  getSearchResultsBasedOnKeywords,
  updateUserAffiliationAndOrganization,
};
