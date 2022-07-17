let mongoose = require("mongoose");

// Request schema
let requestSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REFUSED"],
        default: "PENDING",
    },
    message: {
        type: String,
        maxLength: 200,
        default: ''
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
        expires: '60d'
    },
    dateOfLastUpdate: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

requestSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select:
            "fullname profilePhoto",
    }).populate({
        path: "requestedUser",
        select: "fullname profilePhoto",
    }).populate({
        path: "content",
    });
    next();
});

module.exports = mongoose.model("Request", requestSchema);