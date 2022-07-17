const Page = require("../../models/page");

const addCreateAt = async () => {
  const pages = await Page.find();
  for (let page of pages) {
    try {
      await Page.updateOne(
        { _id: `${page._id}` },
        { created_at: page._id.getTimestamp() }
      );
      console.log(`update  page was successful`);
    } catch (err) {
      console.error(
        { err },
        `Error while updating the page: ${err.message}`
      );
    }
  }
};

module.exports = {
  addCreateAt,
};
