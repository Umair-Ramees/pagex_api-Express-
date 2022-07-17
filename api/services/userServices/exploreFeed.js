const userDao = require('../../daos/userDao/userDao');
const contentDao = require('../../daos/contentDao/contentDao');

const getUsersExploreFeedWithPageLimit = async (req, res) => {
  if (req.params.passion) {
    const users = await userDao.getUsersExploreFeedWithPageLimit(req, req.params.passion, req.params.page, req.params.limit);
    return res.status(200).json({
      success: true,
      code: 200,
      data: users,
    });
  }

  return res.status(404).json({
    success: false,
    code: 404,
    data: {
      msg: 'Please provide passion id',
    },
  });
};

const getSearchResultsBasedOnKeywords = async (req, res) => {
    try {
      if (req.query) {
        const users = await userDao.getUsersBasedOnKeywords(req.query.text);
        const content = await contentDao.getContentBasedOnKeyword(req.query.text);
        return res.status(200).json({
          success: true,
          data: {
            users: users,
            content: content
          }
        })
      }
    }
    catch (error) {
      console.error('Error occurred trying to get info', error);
      res.status(500).text('An error has occurred');
    }
};

module.exports = {
  getUsersExploreFeedWithPageLimit,
  getSearchResultsBasedOnKeywords
};
