const mongoose = require("mongoose");

async function AccountValidate(data, code) {
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      fullname: data.fullname,
      email: data.email,
      validationCode: code,
      active: data.active,
    });
  }); 
}

module.exports = {
  AccountValidate,
};
