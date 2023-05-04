"use strict";

const { UserController } = require("./controllers");
const { UserService } = require("../services");
const { UserRepository } = require("../database");
const { isAuthenticated } = require("./middlewares/auth.middleware");

function user(app) {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.get("/", isAuthenticated, userController.getUser);
    app.post("/register", userController.register);
    app.post("/login", userController.login);
    app.post("/refresh", userController.refreshToken);
    app.delete("/logout", isAuthenticated, userController.logout);
}

module.exports = user;
