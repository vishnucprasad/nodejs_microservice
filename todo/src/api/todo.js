"use strict";

const { TodoController } = require("./controllers");
const { TodoService } = require("../services");
const { TodoRepository } = require("../database");
const { isAuthenticated } = require("./middlewares/auth.middleware");

function todo(app) {
    const todoRepository = new TodoRepository();
    const todoService = new TodoService(todoRepository);
    const todoController = new TodoController(todoService);

    app.get("/", isAuthenticated, todoController.getTodos);
    app.get("/:id", isAuthenticated, todoController.getTodo);
    app.post("/", isAuthenticated, todoController.create);
    app.patch("/:id", isAuthenticated, todoController.update);
    app.delete("/:id", isAuthenticated, todoController.delete);
}

module.exports = todo;
