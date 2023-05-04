"use strict";

const { TokenExpiredError } = require("jsonwebtoken");
const {
    UnauthorizedError,
    InternalServerError,
} = require("../../utils/app.errors");
const { verifyAccessToken } = require("../../utils");

async function isAuthenticated(req, res, next) {
    try {
        const tokenDetails = await verifyAccessToken(
            req.headers.authorization?.split(" ")[1]
        );

        req.decoded = tokenDetails;
        next();
    } catch (e) {
        if (e instanceof UnauthorizedError || TokenExpiredError) {
            return next(new UnauthorizedError());
        }

        next(new InternalServerError());
    }
}

module.exports = { isAuthenticated };
