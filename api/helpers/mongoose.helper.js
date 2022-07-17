const mongoose = require("mongoose");

const toObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {
  toObjectId,
};
