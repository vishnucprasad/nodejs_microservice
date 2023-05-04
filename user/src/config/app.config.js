"use strict";

const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `.env.${process.env.NODE_ENV}`;
    dotenv.config({ path: configFile });
} else {
    dotenv.config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGO_URI,
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
