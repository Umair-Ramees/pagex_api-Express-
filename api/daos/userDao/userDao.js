const User = require('../../model/user');
const UserClass = require('../../class/UserClass');

const ifExistUserAccount = (email) => {
  return new Promise((resolve, reject) => {
    console.log("I'm in ifExistUserAccount");
    resolve(1);
    // User.find({
    //     email: email,
    //   })
    //   .exec()
    //   .then((response) => {
    //     resolve(response.length);
    //   })
    //   .catch((err) => console.log('existEmailToBeValidated ERR :', err));
  });
};

const saveNewUserAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    let user = new User(await UserClass.CreateNewUser(data));
    user
      .save()
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        console.log('saveNewUserAccount ERR :', err);
        resolve(false);
      });
  });
}
module.exports = {
  ifExistUserAccount,
  saveNewUserAccount
};