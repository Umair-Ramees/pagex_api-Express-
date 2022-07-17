
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const subCategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    userId: String,
    categoryId: String,
    description: String

});

module.exports = model("SubCategory", subCategorySchema);