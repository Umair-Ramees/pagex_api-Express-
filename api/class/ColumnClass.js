const mongoose = require("mongoose");

const createNewColumnWithPromotion = (data) => {
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      user: data.userId,
      parentColumn: data.columnId,
      columnDescription: data.columnDescription,
    });
  });
}; 

module.exports = {
  createNewColumnWithPromotion,
};
