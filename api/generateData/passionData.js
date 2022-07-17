const Passion = require('../models/Passion');
const mongoose = require('mongoose');

const listPassions = [
  {
    _id: new mongoose.Types.ObjectId(),
    passionTitle: 'Painting',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    passionTitle: 'Writing',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    passionTitle: 'Singing',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    passionTitle: 'Photography',
  },
];


generatePassionData = () => {
  Passion.find()
    .exec()
    .then((passions) => {
      if (passions.length == 0) {
        listPassions.map((psn) => {
          let passionModel = new Passion(psn);
          passionModel.save();
        });
      }
    })
    .catch((err) => console.log('generatePassionData ERR : ', err));
};

module.exports = {
  generatePassionData,
};
