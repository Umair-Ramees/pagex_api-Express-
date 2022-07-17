const mongoose = require('mongoose');

// Column schema
const columnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        default: '',
    },
    subject: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    form: {
        type: String,
        default: '',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
    isDeleted: {
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

module.exports = mongoose.models.Column || mongoose.model('Column', columnSchema);
