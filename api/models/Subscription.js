let mongoose = require('mongoose');

// Content schema
let SubscriptionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscribeToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscribedOn: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);