const Category = require("../../models/Category");

const getCategoryById = (categoryId) => {
    return Category.findOne({ _id: categoryId })
}

module.exports = {
    getCategoryById 
}
