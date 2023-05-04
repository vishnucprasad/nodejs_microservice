const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

async function generateAccessToken(payload) {
    try {
        return await jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.jwtExpiration,
        });
    } catch (e) {
        throw e;
    }
}

async function generateRefreshToken(payload) {
    try {
        return await jwt.sign(payload, jwtConfig.rtSecret, {
            expiresIn: jwtConfig.jwtRefreshExpiration,
        });
    } catch (e) {
        throw e;
    }
}

async function verifyAccessToken(accessToken) {
    try {
        return await jwt.verify(accessToken, jwtConfig.secret);
    } catch (e) {
        throw e;
    }
}

async function verifyRefreshToken(refreshToken) {
    try {
        return await jwt.verify(refreshToken, jwtConfig.rtSecret);
    } catch (e) {
        throw e;
    }
}

async function refreshAccessToken(payload) {
    try {
        return await jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.jwtExpiration,
        });
    } catch (e) {
        throw e;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    refreshAccessToken,
};
