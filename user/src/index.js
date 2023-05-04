"use strict";

const express = require("express");
const { PORT } = require("./config/app.config");
const { databaseConnection } = require("./database");
const expressApp = require("./express.app");
const { ServerError } = require("./utils/error.handler");
const logger = require("./config/logger.config");

async function StartServer() {
    const app = express();

    databaseConnection.connect();

    expressApp(app);

    const server = app
        .listen(PORT, function () {
            logger.info(`Server is running on port ${PORT}`);
        })
        .on("error", function (e) {
            logger.error(`Port ${e.port} is already in use`);
        });

    const serverError = new ServerError(server);

    process.on("uncaughtException", serverError.unexpectedErrorHandler);
    process.on("unhandledRejection", serverError.unexpectedErrorHandler);

    process.on("SIGINT", serverError.SIGINTHandler);
    process.on("SIGTERM", serverError.SIGTERMHandler);
}

StartServer();
