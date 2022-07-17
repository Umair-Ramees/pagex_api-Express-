const bcrypt = require('bcrypt');
const fs = require('fs');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      resolve(hash);
    });
  });
};

const generateRandomPassword = () => {
  return new Promise((resolve, reject) => {
    resolve(Math.random().toString(36).slice(-8));
  });
};

const generateRandomNum = (size) => {
  return Math.floor(Math.random() * 99999 + 10000);
};

const defaultError = (res, err) => {
  return res.status(500).json({
    error: err,
  });
};

const deleteFile = (fileNameWithUrl) => {
  if (fileNameWithUrl && fileNameWithUrl.indexOf('uploads') > -1 && fileNameWithUrl.indexOf('.') > -1) {
    fs.unlink(fileNameWithUrl, function (err) {
      if (err) {
        console.error('Error occured while deleting file', err, fileNameWithUrl);
      }
      // if no error, file has been deleted successfully
      console.log('File deleted! ', fileNameWithUrl);
    });
  }
};

const isUserAuthorized = (req, userId, res) => {
  if (req.userData.data === userId) {
    return true;
  }

  res.status(401).json({
    message: 'Invalid user id, Not authorized attempt access',
  });

  return false;
};

const normalizeFileName = (fileName) => {
  if (fileName) {
    const regex = /[^0-9a-zA-Z]/g;
    const fileNameLower = fileName.toLowerCase();
    const fileNameWithoutExtention = fileNameLower.substr(0, fileNameLower.lastIndexOf('.') + 1);
    const fileExtention = fileNameLower.substr(fileNameLower.lastIndexOf('.'));

    return `${fileNameWithoutExtention.replace(regex, '')}${fileExtention}`;
  }

  return '';
};


module.exports = {
  defaultError,
  generateRandomPassword,
  hashPassword,
  generateRandomNum,
  deleteFile,
  isUserAuthorized,
  normalizeFileName,
};
