const userDao = require("../../daos/userDao/userDao");
const categoryDao = require("../../daos/categoryDao/categoryDao");
const EmailValidation = require('../../models/EmailValidation');
const utils = require('../../utils/utils');
const accessTokenDao = require('../../class/accessTokenClass');
const AccessToken = require('../../class/accessTokenClass');


async function addNewUser(req, data, res, isThirdParty = false) {

  if (isThirdParty) {
    let photo =
      data.photo ?
      data.photo :
      "Add defauld photo backend";
    const code = utils.generateRandomNum(6);

    const response = await userDao.createAccountValidation({
      ...data,
      active: true
    }, code);
    if (response) {
      const currentCategory = await categoryDao.getCategoryById(data.currentCategory);
      await userDao.saveNewUserAccount({
        ...data,
        currentCategory,
        isThirdParty: true
      }, photo, true).then(async (user) => {
        const accessTokenDao = new AccessToken();
        const token = await accessTokenDao.generateToken(data.email, user._id);
        const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, user._id);
        const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, user._id);
        res.status(200).json({
          success: true,
          code: 200,
          data: {
            
            token: basedAccesstoken,
            userId: user._id,
            profilePhoto: user.profilePhoto,
            firstname: user.firstname,
            lastname: user.lastname,
            isFirstLogIn: true,
            fullname: user.fullname,
            passion: user.passion,
            dateOfCreation: user.dateOfCreation,
            isAffiliated: user.isAffiliated || null,
            organization: user.organization || null,
            expiresInMS: parseInt(process.env.TOKEN_DURATION) * 60 * 60 * 1000,
          },
        });
      }).catch(err => {
        res.status(500);

      })


    }

  } else {
    //check password length
    if (data.password && data.password.length > 0) {
      // check if email and validation code exist
      // and account is active
      if (
        (await userDao.isAccountValidated(data)) === true &&
        (await userDao.ifExistUserAccount(data.email)) === 0
      )
        await userDao.updateAccountValidation(data)
      await EmailValidation.updateOne({
        email: data.email
      }, {
        active: false
      });
      if ((await userDao.ifExistUserAccount(data.email)) === 0) {
        let photo =
          req.files && req.files.length > 0 ?
          req.files[0].path :
          "Add defauld photo backend";
        const currentCategory = await categoryDao.getCategoryById(data.currentCategory);
        if (await userDao.saveNewUserAccount(data, photo, currentCategory)) {
          res.status(200).json({
            success: true,
            data: {
              msg: "Account created with success."
            },
            code: 200
          });
        } else {
          res.status(500);
        }
      } else {
        res.status(200).json({
          success: true,
          data: {
            valid: false,
            // msg: "This account is not active or exists"
            msg: "This email is already in use"
          },
          code: 406
        });
      }
    } else {
      res.status(200).json({
        success: true,
        data: {
          valid: false,
          msg: "Password must include more than 0 characters"
        },
        code: 407
      });
    }
  }

}

module.exports = {
  addNewUser
};