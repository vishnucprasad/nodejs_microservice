"use strict";

const jwtConfig = {
    secret: String(process.env.JWT_SECRET),
    jwtExpiration: 600,
};

module.exports = jwtConfig;
