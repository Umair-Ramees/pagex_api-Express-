const ContentContribution = require("../models/ContentContribution");

const editContentContributions = async (req, res, next) => {
  try {
    const data = await ContentContribution.findByIdAndUpdate( 
      req.params.id,
      req.body,
      { new: true }
    );
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Updated Successfully",
        data,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Error Updating",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteContentContributions = async (req, res, next) => {
  try {
    const data = await ContentContribution.findByIdAndDelete(req.params.id);
    console.log(data);
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Content Deleted Successfully",
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Content not fount",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
module.exports = { editContentContributions, deleteContentContributions };
