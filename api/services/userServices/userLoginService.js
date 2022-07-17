const User = require('../../models/User');
const utils = require('../../utils/utils');
const AccessToken = require('../../class/accessTokenClass');
const verifyPwd = require('../../utils/passwordMatchVerification');
const userDao = require("../../daos/userDao/userDao");
const userService = require('../../services/userServices/index');
const accessTokenDao = require('../../class/accessTokenClass');
const {addNewUser} = require('./createNewAccountService');
const {
  OAuth2Client
} = require('google-auth-library')


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const client = new OAuth2Client(CLIENT_ID)

async function userLoginGoogle(req, data, res) {
  const userInfo = await userDao.ifExistUserAccountByEmail(data.email).then( async user => {
    if (user.length > 0) {
      const googleToken = data.token;
        try {
          const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          if(payload){
            const accessTokenDao = new AccessToken();
            user = user[0];
            const token = await accessTokenDao.generateToken(data.email, user._id);
            const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, user._id);
            const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, user._id);
            if( user.isFirstLogIn){
              await User.updateOne({
                email: user.email,
              },{
                isFirstLogIn: false
              })
            }
            
            res.status(200).json({
              success: true,
              code: 200,
              data: {
                token: basedAccesstoken,
                userId: user._id,
                profilePhoto: user.profilePhoto,
                isFirstLogIn: user.isFirstLogIn,
                firstname: data.firstname,
                lastname: data.lastname,
                fullname: data.fullname,
                passion: user.passion || null,
                dateOfCreation: user.dateOfCreation,
                isAffiliated: user.isAffiliated || null,
                organization: user.organization || null,
                expiresInMS: parseInt(process.env.TOKEN_DURATION) * 60 * 60 * 1000,
              },
            }); 
          }
        } catch (err) {
          res.status(500);
        }
      
     

    } else {
      addNewUser(req, data, res, true);
    }
  })
}
async function userLogin(userInfo, res) {
  const accessTokenDao = new AccessToken();
  User.find({
      email: userInfo.email,
    })
    .exec()
    .then(async (userData) => {
      if (userData.length === 0) {
        res.status(200).json({
          success: true,
          code: 406,
          data: {
            msg: 'Account does not exists',
          },
        });
      } else if (userData[0].isThirdParty) {
        res.status(200).json({
          success: true,
          code: 407,
          data: {
            msg: 'Please login using your third party account',
          },
        });

      } else if (await verifyPwd.passwordMatchVerification(userInfo.password, userData[0].password)) {
        const token = await accessTokenDao.generateToken(userData[0].email, userData[0]._id);
        const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, userData[0]._id);
        const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, userData[0]._id);
        if( userData[0].isFirstLogIn){
          await User.updateOne({
            email: userInfo.email,
          },{
            isFirstLogIn: false
          })
        }
        res.status(200).json({
          success: true,
          code: 200,
          data: {
            token: basedAccesstoken,
            userId: userData[0]._id,
            isFirstLogIn: userData[0].isFirstLogIn,
            profilePhoto: userData[0].profilePhoto,
            firstname: userData[0].firstname,
            lastname: userData[0].lastname,
            fullname: userData[0].fullname,
            passion: userData[0].passion,
            dateOfCreation: userData[0].dateOfCreation,
            isAffiliated: userData[0].isAffiliated || null,
            organization: userData[0].organization || null,
            expiresInMS: parseInt(process.env.TOKEN_DURATION) * 60 * 60 * 1000,
          },
        });
        
      } else {
        res.status(200).json({
          success: true,
          code: 407,
          data: {
            msg: 'Password and/or email is not correct',
          },
        });
      }
    })
    .catch((err) => utils.defaultError(res, err));
}

module.exports = {
  userLogin,
  userLoginGoogle
};