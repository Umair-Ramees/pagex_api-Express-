let mongoose = require("mongoose");

// ContentContribution schema
let ContentContribution = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    contentDeleted: {
      type: Boolean,
      default: false,
    },
    contentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contentTag: String,
    contentImage: String,
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },
    dateOfLastUpdate: {
      type: Date,
      default: Date.now,
    },
    pageid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("ContentContribution", ContentContribution);
