let mongoose = require("mongoose");

// Content schema
let ContentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parentContent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Content"
    },
    contentTitle: String,
    contentDescription: String,
    contentImage: String,
    contentPageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    },
    contentArtist: String,
    contentTag: String,
    contentType: String,
    typeOfReaction: String,
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    subject: String,
    artForms: {
      ids: [mongoose.Schema.Types.ObjectId],
      titles: [String],
    },
    details: {
      volume: String,
      language: String,
      genre: String,
      publisher: String,
      release: String,
      yearofprod: String,
      producer: String,
      writer: String,
      rating: String,
      runtime: String,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    contentDeleted: {
      type: Boolean,
      default: false,
    },
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },
    dateOfLastUpdate: {
      type: Date,
      default: Date.now,
    },
    revealedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    promotionCount: Number,
    subContributions: {
      type: Array,
    },
  },
  { minimize: false }
);

ContentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "parentContent",
  });
  next();
});


module.exports = mongoose.models.Content || mongoose.model("Content", ContentSchema);
