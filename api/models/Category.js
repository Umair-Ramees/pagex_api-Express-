
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    userId: String,
    value: String,
    subCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ],
    description: String,
    categoryType: {
        type: String,
        enum: ['ScienceAndHumanities', 'LawBusinessAndPolitics', 'ArtAndEntertainment'],
        default: 'ScienceAndHumanities'
    }
});

module.exports = mongoose.model("Category", categorySchema);