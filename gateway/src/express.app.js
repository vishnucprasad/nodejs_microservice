"use strict";

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
    unMatchedRoutesHandler,
    errorHandler,
} = require("./utils/error.handler");
const proxy = require("express-http-proxy");

async function expressApp(app) {
    // Enable CORS for all routes
    app.use(cors());

    // Parse request bodies as JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Parse cookies as JSON
    app.use(cookieParser());

    // Proxy
    app.use("/user", proxy("http://localhost:8001"));
    app.use("/todo", proxy("http://localhost:8002"));

    // Send not found error for all unmatched routes
    app.all("*", unMatchedRoutesHandler);

    // Error handler
    app.use(errorHandler);
}

module.exports = expressApp;
