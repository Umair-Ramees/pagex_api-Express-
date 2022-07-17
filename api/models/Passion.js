let mongoose = require('mongoose');

// Passion schema
let PassionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	passionTitle: String,
    passionDescription: {
        type: String,
        default: "",
    },
    passionImage: {
        type: String,
        default: "",
    },
    passionDeleted: {
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

module.exports = mongoose.model('Passion', PassionSchema);