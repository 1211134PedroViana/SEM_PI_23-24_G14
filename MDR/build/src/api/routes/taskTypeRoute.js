"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurrentUser_1 = __importDefault(require("../middlewares/attachCurrentUser"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/taskTypes', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.taskType.name);
    //API POST request - create a new TaskType
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => ctrl.createTaskType(req, res, next));
    //API GET request - get TaskType by name
    route.get('/getTaskType/:name', (req, res, next) => ctrl.getTaskType(req, res, next));
    //API GET request - get TaskType by ID
    route.get('/getTaskTypeById/:taskTypeId', (req, res, next) => ctrl.getTaskTypeById(req, res, next));
};
//# sourceMappingURL=taskTypeRoute.js.map