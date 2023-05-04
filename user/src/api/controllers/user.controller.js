"use strict";

const { TokenExpiredError } = require("jsonwebtoken");
const {
    InternalServerError,
    STATUS_CODES,
    ConflictError,
    UnauthorizedError,
} = require("../../utils/app.errors");

class UserController {
    constructor(service) {
        this.service = service;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    async register(req, res, next) {
        try {
            const { accessToken, refreshToken, user } =
                await this.service.register(req.body);

            res.status(STATUS_CODES.OK).json({
                accessToken,
                refreshToken,
                user,
            });
        } catch (e) {
            if (e.code === 11000) {
                return next(
                    new ConflictError("This email is aleady registered")
                );
            }

            next(new InternalServerError(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const { accessToken, refreshToken, user } =
                await this.service.login(email, password);

            res.status(STATUS_CODES.OK).json({
                accessToken,
                refreshToken,
                user,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;

            const accessToken = await this.service.refreshToken(refreshToken);

            res.status(STATUS_CODES.OK).json({
                accessToken,
            });
        } catch (e) {
            if (e instanceof UnauthorizedError || TokenExpiredError) {
                return next(new UnauthorizedError());
            }

            next(new InternalServerError(e.message));
        }
    }

    async getUser(req, res, next) {
        try {
            const { _id } = req.decoded;

            const user = await this.service.getUser(_id);

            res.status(STATUS_CODES.OK).json({
                user,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }

    async logout(req, res, next) {
        try {
            const { _id } = req.decoded;

            await this.service.logout(_id);

            res.status(STATUS_CODES.OK).json({ status: true });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
}

module.exports = UserController;
