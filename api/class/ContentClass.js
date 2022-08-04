const mongoose = require("mongoose");
const ContentType = require("../contants/ContentType");

createNewContent = (data, photo) => {
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      user: data.contentUserId,
      contentTitle: data.contentTitle,
      contentDescription: data.contentDescription,
      contentImage: photo,
      contentType: data.contentType,
    });
  }); 
};

createNewContentWithContribution = (data, photo, artForms) => {
  return {
    _id: new mongoose.Types.ObjectId(),
    user: data.contentUserId,
    contentDescription: data.contentDescription,
    contentTag: data.contentTag,
    contentImage: photo,
    contentPageId: data.contentPageId,
    column: data.columnId,
    artForms: artForms,
    subject: data.subject,
    contentType: "Contribution",
  };
};

createNewContentWithWork = (data, photo, artForms) => {
  let details = {
    volume: data.volume,
    language: data.language,
    genre: data.genre,
    publisher: data.publisher,
    release: data.release,
    yearofprod: data.yearofprod,
    producer: data.producer,
    writer: data.writer,
    rating: data.rating,
    runtime: data.runtime,
  };
  console.log(details);
  console.log("details-----------------------");
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      user: data.contentUserId,
      contentTitle: data.contentTitle,
      contentDescription: data.contentDescription,
      contentImage: photo,
      artForms: artForms,
      contentArtist: data.contentArtist,
      contentType: "Work",
      details: details,
    });
  });
};

const createNewContentWithReaction = (data, photo) => {
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      user: data.userId,
      parentContent: data.contentId,
      contentDescription: data.contentDescription,
      contentTag: data.contentTag,
      contentImage: photo,
      contentType: ContentType.Reaction,
      typeOfReaction: data.typeOfReaction,
    });
  });
};

const createNewContentWithPromotion = (data) => {
  return new Promise((resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      user: data.userId,
      parentContent: data.contentId,
      contentDescription: data.contentDescription,
      contentType: ContentType.Promotion,
    });
  });
};

module.exports = {
  createNewContent,
  createNewContentWithContribution,
  createNewContentWithWork,
  createNewContentWithReaction,
  createNewContentWithPromotion,
};
