const Subscription = require('../../models/Subscription');
const userDao = require('../userDao/userDao');

const mongoose = require('mongoose');

const createSubscription = async (data, res) => {
  const result = {
    error: '',
    statusCode: 200,
    isSaved: false,
  };

  try {
    const users = await userDao.getUsersShortInfo([data.userId, data.subscribeToUserId]);
    if (users.length == 2 && data.userId != data.subscribeToUserId) {
      const isSubscriptionAlreadyExists = await Subscription.exists({ user: data.userId, subscribeToUserId: data.subscribeToUserId });
      if (!isSubscriptionAlreadyExists) {
        const sub = new Subscription({
          _id: new mongoose.Types.ObjectId(),
          user: data.userId,
          subscribeToUserId: data.subscribeToUserId,
        });

        const saved = await sub.save();
        if (saved._id) {
          result.isSaved = true;
        }
      } else {
        result.error = 'Subscription already exists';
      }
    } else {
      result.statusCode = 404;
      result.error = 'Invalid userIds';
    }
  } catch (error) {
    console.log('createSubscription Err ', error);
    result.error = 'Internal Server occured, while creating subscription';
    result.statusCode = 500;
  }
  return result;
};

const removeSubscription = async (data, res) => {
  const result = {
    error: '',
    statusCode: 200,
    isRemoved: false,
  };

  try {
    const users = await userDao.getUsersShortInfo([data.userId, data.unSubscribeToUserId]);
    if (users.length == 2) {
      const isSubscriptionAlreadyExists = await Subscription.exists({ user: data.userId, subscribeToUserId: data.unSubscribeToUserId });
      if (isSubscriptionAlreadyExists) {
        const response = await Subscription.remove({ user: data.userId, subscribeToUserId: data.unSubscribeToUserId });
        console.log(response);
        if (response) {
          result.isRemoved = true;
        }
      } else {
        result.error = 'No subscription found';
        result.statusCode = 404;
      }
    } else {
      result.error = 'Invalid userIds';
      result.statusCode = 404;
    }
  } catch (error) {
    console.error('removeSubscription Err ', error);
    result.error = 'Internal Server occured, while removing subscription';
    result.statusCode = 500;
  }
  return result;
};

const subscriptionStatus = async (currentUserId, subscribeToUserId) => {
  const isSubscriptionAlreadyExists = await Subscription.exists({ user: currentUserId, subscribeToUserId: subscribeToUserId });
  if (isSubscriptionAlreadyExists) {
    return true;
  }

  return false;
};


const getListOfSubscibers = async (userId) => {
  const result = {
    errors: [],
    data: [],
  };
  try {
    const user = await userDao.getUserById(userId);
    if (user != null) {
      const subscriberIds = await Subscription.find({ subscribeToUserId: userId }, { _id: 0, user: 1 });
      if (subscriberIds.length) {
        result.data = await userDao.getUsersShortInfo(subscriberIds.map((s) => s.user));
      }
    } else {
      result.errors.push('User not found');
    }
  } catch (error) {
    console.log('getListOfSubscibers: Err', error);
    result.errors.push('Internal server occured');
  }

  return result;
};
const getListOfSubscribtion = async (userId) => {
  const result = {
    errors: [],
    data: [],
  };
  try {
    const user = await userDao.getUserById(userId);
    if (user != null) {
      const subscriberIds = await Subscription.find({ user : userId }, { _id: 0, subscribeToUserId: 1 });
      if (subscriberIds.length) {
        result.data = await userDao.getUsersShortInfo(subscriberIds.map((s) => s.subscribeToUserId));
      }
    } else {
      result.errors.push('User not found');
    }
  } catch (error) {
    console.log('getListOfSubscibtions: Err', error);
    result.errors.push('Internal server occured');
  }

  return result;
};
module.exports = {
  createSubscription,
  subscriptionStatus,
  removeSubscription,
  getListOfSubscibers,
  getListOfSubscribtion
};
