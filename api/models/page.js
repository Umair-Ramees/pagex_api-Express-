const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const pageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, "title is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "category is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: [false, "Date is not required"],
  },
  updated_at: {
    type: Date,
    required: [false, "Date is not required"],
  },
  created_at: {
    type: Date,
    required: [false, "Date is not required"],
  },
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
});

pageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "contributions",
    select:
      "contentImage contentDeleted contentTitle contentDescription contentTag",
    populate: {
      path: "user",
      select: "fullname profilePhoto",
      model: "User",
    },
  }).populate({
    path: "user",
    select: "fullname profilePhoto",
  });
  next();
});

module.exports = mongoose.models.Page || model("Page", pageSchema);
