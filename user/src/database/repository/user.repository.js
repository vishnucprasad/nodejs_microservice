"use strict";

const { User, RefreshToken } = require("../models");

class UserRepository {
    async createUser(user) {
        try {
            return await new User(user).save();
        } catch (e) {
            throw e;
        }
    }

    async saveRefreshToken(user, refreshToken) {
        try {
            return await new RefreshToken({
                user: user._id,
                token: refreshToken,
            }).save();
        } catch (e) {
            throw e;
        }
    }

    async findUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (e) {
            throw e;
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ email: email });
        } catch (e) {
            throw e;
        }
    }

    async findRefreshTokenByUserId(userId) {
        try {
            return await RefreshToken.findOne({ user: userId });
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserRepository;
