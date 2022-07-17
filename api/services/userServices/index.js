const validateEmailAccount = require('./validatAccoutSerice');
const isCodeValidService = require('./isCodeValidService');
const createNewAccountService = require('./createNewAccountService');
const userLoginService = require('./userLoginService');
const { createSubscription, removeSubscription, getListOfSubscibers,getListOfSubscibtions, subscriptionStatus } = require('./subscriptionService');
const { getUserInfo, editUserInfo } = require('./userInfoService');
const { getListOfUsersWhoDidPromotion } = require('./userPromotionService');
const { getListOfUsersWhoDidReaction } = require('./userReactionService');
const { getUsersExploreFeedWithPageLimit } = require('./exploreFeed');
const { getSearchResultsBasedOnKeywords } = require('./exploreFeed');
const { setUserAffiliation } = require('./userAffiliationService');
module.exports = {
  userLoginService,
  createNewAccountService,
  validateEmailAccount,
  isCodeValidService,
  createSubscription,
  getListOfSubscibers,
  getListOfSubscibtions,
  removeSubscription,
  getUserInfo,
  editUserInfo,
  getListOfUsersWhoDidPromotion,
  getListOfUsersWhoDidReaction,
  getUsersExploreFeedWithPageLimit,
  subscriptionStatus,
  getSearchResultsBasedOnKeywords,
  setUserAffiliation,
  
};
