let mongoose = require('mongoose');

let ArtFormSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, unique: true },
    description: {
        type: String,
        default: "",
    },
    artFormDeleted: {
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
});

module.exports = mongoose.model('ArtForm', ArtFormSchema);