"use strict";

const { InternalServerError, STATUS_CODES } = require("../../utils/app.errors");

class TodoController {
    constructor(service) {
        this.service = service;
        this.create = this.create.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async create(req, res, next) {
        try {
            const { _id } = req.decoded;

            const todo = await this.service.create(_id, req.body);

            res.status(STATUS_CODES.OK).json({
                todo,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
    async getTodos(req, res, next) {
        try {
            const { _id } = req.decoded;

            const todos = await this.service.getTodos(_id);

            res.status(STATUS_CODES.OK).json({
                todos,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
    async getTodo(req, res, next) {
        try {
            const todo = await this.service.getTodo(req.params.id);

            res.status(STATUS_CODES.OK).json({
                todo,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
    async update(req, res, next) {
        try {
            const todo = await this.service.update(req.params.id, req.body);

            res.status(STATUS_CODES.OK).json({
                todo,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            const todo = await this.service.delete(req.params.id);

            res.status(STATUS_CODES.OK).json({
                todo,
            });
        } catch (e) {
            next(new InternalServerError(e.message));
        }
    }
}

module.exports = TodoController;
