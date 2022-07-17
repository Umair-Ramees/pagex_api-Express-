const userDao = require('../../daos/userDao/userDao');
const { isUserAuthorized } = require('../../utils/utils');

const setUserAffiliation = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (isUserAuthorized(req, userId, res)) {
      const orgPayload = req.body;
      if(!orgPayload || !orgPayload.organizationName || !orgPayload.organizationType){
          return res.status(result.statusCode).json({
              success: true,
              data: {
                msg: 'Input Is Invalid',
              },
              code: 400,
            });
      }
      const result = await userDao.updateAffiliation(userId, req.body);
      if(result._id.toString() === userId){
        return res.status(200).json({
          success: true,
          data: {
            isAffiliated: result.isAffiliated,
            organization: result.organization
          },
          code: 200,
        });
      }
    }
    return res.status(401).json({
      message: 'Invalid user id, Not authorized attempt access',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        msg: error,
      },
      code: 500,
    });
  }
};

module.exports = {
    setUserAffiliation
};
