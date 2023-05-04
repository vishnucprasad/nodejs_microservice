"use strict";

const mongoose = require("mongoose");
const logger = require("../config/logger.config");
const { DB_URL, DB_OPTIONS } = require("../config/app.config");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

function connect() {
    // Connecting to mongoose
    mongoose.connect(DB_URL, DB_OPTIONS);

    // Listen for mongoose connected event
    mongoose.connection.on("connected", function () {
        logger.info(`mongoose connected to ${DB_URL}`);
    });

    // Listen for mongoose connection error event
    mongoose.connection.on("error", function (err) {
        logger.error(`mongoose connection error: ${err}`);
    });

    // Listen for mongoose disconnected event
    mongoose.connection.on("disconnected", function () {
        logger.info("mongoose disconnected");
    });
}

function close() {
    // Closing mongoose connection
    mongoose.connection.close(function () {
        logger.info("mongoose disconnected through app termination");
        process.exit(0);
    });
}

module.exports = {
    connect,
    close,
};
