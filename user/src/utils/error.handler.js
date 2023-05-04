"use strict";

const { NotFoundError } = require("./app.errors");
const { databaseConnection } = require("../database");
const logger = require("../config/logger.config");

function unMatchedRoutesHandler(req, res, next) {
    next(new NotFoundError("Requested URL not found"));
}

function errorHandler(e, req, res, next) {
    res.status(e.statusCode || 500).json(e);
}

class ServerError {
    constructor(server) {
        this.server = server;
        this.unexpectedErrorHandler = this.unexpectedErrorHandler.bind(this);
        this.SIGINTHandler = this.SIGINTHandler.bind(this);
        this.SIGTERMHandler = this.SIGTERMHandler.bind(this);
    }
    unexpectedErrorHandler(e) {
        console.log(e);
        logger.error(e);

        if (this.server) {
            this.server.close(() => {
                logger.info("Server closed");
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    }
    SIGINTHandler() {
        logger.info("SIGINT received");
        databaseConnection.close();
        if (this.server) {
            this.server.close();
        }
    }
    SIGTERMHandler() {
        logger.info("SIGINT received");
        databaseConnection.close();
        if (this.server) {
            this.server.close();
        }
    }
}

module.exports = {
    unMatchedRoutesHandler,
    errorHandler,
    ServerError,
};
