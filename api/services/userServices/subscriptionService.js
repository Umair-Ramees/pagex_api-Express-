const subscriptionDao = require('../../daos/subscriptionDao/subscriptionDao');
const { isUserAuthorized } = require('../../utils/utils');

const createSubscription = async (req, data, res) => {
  if (isUserAuthorized(req, data.userId, res)) {
    const result = await subscriptionDao.createSubscription(data, res);

    if (result.isSaved) {
      return res.status(result.statusCode).json({
        success: true,
        data: {
          msg: 'Subscription created with success',
        },
        code: 200,
      });
    }

    return res.status(result.statusCode).json({
      success: false,
      error: {
        msg: result.error,
      },
      code: 500,
    });
  }
};

const removeSubscription = async (req, data, res) => {
  if (isUserAuthorized(req, data.userId, res)) {
    const result = await subscriptionDao.removeSubscription(data, res);

    if (result.isRemoved) {
      return res.status(result.statusCode).json({
        success: true,
        data: {
          msg: 'Removed subscription successfully',
        },
        code: 200,
      });
    }

    return res.status(result.statusCode).json({
      success: false,
      error: {
        msg: result.error,
      },
      code: 500,
    });
  }
};

const subscriptionStatus = async (req, data, res) => {
  const result = await subscriptionDao.subscriptionStatus(req.userData.data, req.params.subscribeToUserId);

  return res.status(200).json({
    success: true,
    data: {
      subscriptionStatus: (result) ? 'Ok' : 'NotFound',
    },
    code: 200,
  });
};

const getListOfSubscibers = async (userId, res) => {
  const result = await subscriptionDao.getListOfSubscibers(userId, res);
  if (result.data.length) {
    return res.status(200).json({
      success: true,
      data: result.data,
      code: 200,
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      msg: result.errors[0],
    },
    code: 500,
  });
};


const getListOfSubscibtions = async (userId, res) => {
  const result = await subscriptionDao.getListOfSubscribtion(userId, res);
  if (result.data.length) {
    return res.status(200).json({
      success: true,
      data: result.data,
      code: 200,
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      msg: result.errors[0],
    },
    code: 500,
  });
};

module.exports = {
  createSubscription,
  removeSubscription,
  getListOfSubscibers,
  getListOfSubscibtions,
  subscriptionStatus,
};
