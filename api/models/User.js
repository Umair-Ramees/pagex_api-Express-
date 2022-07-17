let mongoose = require("mongoose");

// User schema
let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    require: true,
  },
  email: String,
  password: String,
  passion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passion",
  },
  role: {
    type: String,
    default: "USER",
  },
  profilePhoto: String,
  bio: String,
  location: String,
  headline: String,
  status: {
    type: String,
    default: "Active",
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  isFirstLogIn: {
    type: Boolean,
    default: true,
  },
  isThirdParty: {
    type: Boolean,
    default: false
  },
  dateOfLastUpdate: {
    type: Date,
    default: Date.now,
  },
  isAffiliated: {
    type: Boolean,
    default: false,
  },
  organization: {
    organizationName: {
      type: String,
      default: null,
    },
    organizationType: {
      type: String,
      enum: ["school", "business", "government", null],
      default: null,
    },
  },
  currentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
});

module.exports = mongoose.model("User", userSchema);