const pageService = require("../services/pageService");

const getUserSubscriptionPages = (req, res, next) => {
  pageService.getUserSubscriptionPages(req, res, next);
};

const addNewPage = (req, res, next) => {
  pageService.addNewPage(req, res, next);
};

const getAllPages = (req, res, next) => {
  pageService.getAllPages(req, res, next);
};

const getPage = (req, res, next) => {
  pageService.getPage(req, res, next);
};

const getPageByUserId = (req, res, next) => {
  pageService.getPageByUserId(req, res, next);
};

const editPage = (req, res, next) => {
  pageService.editPage(req, res, next);
};
const deletePage = (req, res, next) => {
  pageService.deletePage(req, res, next);
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
