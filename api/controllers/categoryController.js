const categoryService = require("../services/categoryService/index");

const getCategories = async (req, res, next) =>
  await categoryService.getCategories(res);
const createNewCategory = async (req, res, next) =>
  await categoryService.createNewCategory(req.userData.data, req.body, res);
const setCurrentCategory = (req, res) => {
  return categoryService.setUserCurrentCategory(req, req.body, res);
};

module.exports = {
  getCategories,
  createNewCategory,
  setCurrentCategory,
};
