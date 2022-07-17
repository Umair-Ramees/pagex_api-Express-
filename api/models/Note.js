
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const noteSchema = Schema({
    _id: Schema.Types.ObjectId,
    note: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column'
    }
});

module.exports = model("Note", noteSchema);