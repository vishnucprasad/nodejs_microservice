"use strict";

const {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken,
    verifyRefreshToken,
    verifyAccessToken,
} = require("../utils");
const { NotFoundError, UnauthorizedError } = require("../utils/app.errors");

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async register(userDetails) {
        try {
            const user = await this.repository.createUser(userDetails);

            const payload = { _id: user._id };

            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken(payload);

            await this.repository.saveRefreshToken(user, refreshToken);

            return { accessToken, refreshToken, user };
        } catch (e) {
            throw e;
        }
    }

    async login(email, password) {
        try {
            const user = await this.repository.findUserByEmail(email);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            if (!(await user.isValidPassword(password))) {
                throw new UnauthorizedError("Invalid password");
            }

            const payload = { _id: user._id };

            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken(payload);

            const savedRefreshToken =
                await this.repository.findRefreshTokenByUserId(user._id);

            if (savedRefreshToken) {
                await savedRefreshToken.remove();
            }

            await this.repository.saveRefreshToken(user, refreshToken);

            return { accessToken, refreshToken, user };
        } catch (e) {
            throw e;
        }
    }

    async refreshToken(refreshToken) {
        try {
            const tokenDetails = await verifyRefreshToken(refreshToken);

            const payload = { _id: tokenDetails._id };

            const accessToken = await refreshAccessToken(payload);

            return accessToken;
        } catch (e) {
            throw e;
        }
    }

    async verifyAccessToken(accessToken) {
        try {
            const tokenDetails = await verifyAccessToken(accessToken);

            if (!tokenDetails) {
                return next(new UnauthorizedError());
            }

            return tokenDetails;
        } catch (e) {
            throw e;
        }
    }

    async getUser(userId) {
        try {
            return await this.repository.findUserById(userId);
        } catch (e) {
            throw e;
        }
    }

    async logout(userId) {
        try {
            const refreshToken = await this.repository.findRefreshTokenByUserId(
                userId
            );

            if (refreshToken) {
                await refreshToken.remove();
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserService;
