let mongoose = require('mongoose');

// Email account validation schema
let accountSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	fullname:{
		type: String,
		require: true
    },
    email:{
		type: String,
		require: true
    },
    validationCode: {
		type: String,
		default: "000000"
    },
    active:{
		type: Boolean,
		default: false
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

module.exports = mongoose.model('Account', accountSchema);