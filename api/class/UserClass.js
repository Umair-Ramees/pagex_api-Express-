const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function CreateNewUser(data, photo, currentCategory, isThirdParty=false) {
  return new Promise(async (resolve, reject) => {
    let hashedPwd = await utils.hashPassword(data.password);
    resolve({
      _id: new mongoose.Types.ObjectId(),
      fullname: data.fullname,
      email: data.email,
      password: hashedPwd,
      profilePhoto: photo,
      currentCategory: currentCategory,
      isThirdParty:isThirdParty,
      isFirstLogIn: true,
    });
  });
}


module.exports = { 
  CreateNewUser,
};
