"use strict";

const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Number,
        default: moment().valueOf(),
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf(),
    },
});

TodoSchema.pre("findOneAndUpdate", function (next) {
    this._update.modifiedAt = moment().valueOf();
    next();
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
