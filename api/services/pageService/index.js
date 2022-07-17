const Page = require("../../models/page");
const mongoose = require("mongoose");
const mongooseHelper = require("../../helpers/mongoose.helper");
const Subscription = require("../../models/Subscription");
const User = require("../../models/User");
const categoryDao = require("../../daos/categoryDao/categoryDao");

const getUserSubscriptionPages = async (req, res) => {
  const { userId } = req.params;
  const { page = 0, limit = 5 } = req.query;
  const activityPages = await Page.aggregate([
    {
      $lookup: {
        from: Subscription.collection.name,
        let: { userId: "$user" },
        as: "subscriptions",
        pipeline: [
          {
            $match: {
              user: mongoose.Types.ObjectId(userId),
              $expr: { $and: [{ $eq: ["$subscribeToUserId", "$$userId"] }] },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        subscriptions: { $ne: [] },
      },
    },
    {
      $sort: {
        updated_at: -1,
      },
    },
    {
      $skip: Number(page * limit),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        _id: 1,
        title: 1,
        user: {
          fullname: 1,
          profilePhoto: 1,
          firstname: 1,
        },
        updated_at: 1,
        date: 1,
        dateOfCreation: 1,
      },
    },
  ]);
  return res.status(200).json({
    status: "Success",
    message: "Created a new page",
    activityPages,
  });
};

const addNewPage = async (req, res, next) => {
  let date = new Date();
  let image;
  if (req.files) {
    image = req.files[0].path;
  } else {
    image = "image not found";
  }

  try {
    const currentCategory = await categoryDao.getCategoryById(req.body.currentCategory);
    const newPage = await Page.create({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      currentCategory,
      date,
      image,
    });
    return res.status(200).json({
      status: "Success",
      message: "Created a new page",
      newPage,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getAllPages = async (req, res, next) => {
  try {
    //FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // <--------Pagination--------->
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = page * limit - limit;
    const totalResults = await Page.find(queryObj).count();
    const pages = await Page.find(queryObj).skip(skip).limit(limit);

    res.status(200).json({
      status: "Success",
      message: "Pages Fetched successfully",
      pages,
      totalResults,
    });
  } catch (err) {
    return res.status(302).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getPage = async (req, res, next) => {
  try {
    // <--------Pagination--------->
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = page * limit - limit;
    const pages = await Page.find({ category: req.params.category })
      .skip(skip)
      .limit(limit);

    if (pages) {
      res.status(200).json({
        status: "Success",
        message: "Page fetched Successfully",
        page: pages,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Page not found",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getPageByUserId = async (req, res, next) => {
  try {
    const _page = req.query.page * 1 || 1;
    const _limit = req.query.limit * 1 || 10;
    const skip = _page * _limit - _limit;
    const pages = await Page.find({
      user: mongooseHelper.toObjectId(req.params.user),
    })
      .skip(skip)
      .limit(_limit);

    if (pages.length) {
      return res.status(200).json({
        status: "Success",
        message: "Pages fetched Successfully",
        pages,
      });
    } else {
      return res.status(404).json({
        status: "Failed",
        message: "pages NotFound",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const editPage = async (req, res, next) => {
  try {
    let image;
    let page;
    if (req.files.length > 0) {
      image = req.files[0].path;
      page = await Page.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updated_at: Date.now(), image },
        {
          new: true,
        }
      );
    } else {
      page = await Page.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updated_at: Date.now() },
        {
          new: true,
        }
      );
    }

    if (page) {
      res.status(200).json({
        status: "Success",
        message: "Updated Successfully",
        page,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Page not found",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (page) {
      res.status(200).json({
        status: "Success",
        message: "Page Deleted Successfully",
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Page not found",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  addNewPage,
  getAllPages,
  getPage,
  editPage,
  deletePage,
  getPageByUserId,
  getUserSubscriptionPages,
};
