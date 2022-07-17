const jwt = require('jsonwebtoken');
const accessTokenDao = require('../class/accessTokenClass');

module.exports = async (req, res, next) => {
  try {
    const accessToken = new accessTokenDao();
    if (req.headers.authorization == '') {
      res.status(401).json({
        message: 'Not authorized attempt access, this incedent will be reported!',
      });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      const getAccessToken = jwt.decode(token);
      const tokenInfo = await accessToken.getTokenByAccessToken(getAccessToken.id);
      const decode = jwt.verify(tokenInfo, process.env.JWT_KEY);
      req.userData = decode;
      next();
    }
  } catch (error) {
    console.error('error occured while parsing access_token', error, req.headers.authorization);
    res.status(401).json({
      message: 'Not authorized attempt access, this incedent will be reported',
    });
  }
};
