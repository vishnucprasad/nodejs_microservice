"use strict";

const mongoose = require("mongoose");
const moment = require("moment");
const { jwtRefreshExpiration } = require("../../config/jwt.config");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: moment().valueOf(),
    },
    expiresAt: {
        type: Number,
        default: moment().valueOf() + jwtRefreshExpiration * 1000,
    },
});

RefreshTokenSchema.index({ user: 1 });

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;
