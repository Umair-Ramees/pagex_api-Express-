const mongoose = require('mongoose');
const multer = require('multer');
const shortid = require('shortid');
const mkdirp = require('mkdirp');
const { normalizeFileName } = require('../utils/utils');
/**
 * Multer filter the uplaod file via [POST] and/or [GET] request
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = './uploads/';
    mkdirp.sync(path);
    cb(null, path);
  },
  filename: function (req, file, cb) {
    // Rename the uplaoded file
    const id = shortid.generate();
    cb(null, `${id}-${normalizeFileName(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Define the extension of the file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

module.exports = {
  upload,
};
