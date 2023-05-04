const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

async function verifyAccessToken(accessToken) {
    try {
        return await jwt.verify(accessToken, jwtConfig.secret);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    verifyAccessToken,
};
