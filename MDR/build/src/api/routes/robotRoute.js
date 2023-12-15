"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurrentUser_1 = __importDefault(require("../middlewares/attachCurrentUser"));
const authorizeRole_1 = __importDefault(require("../middlewares/authorizeRole"));
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/robots', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.robot.name);
    //API POST request - create a new Robot
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.robot.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            code: celebrate_1.Joi.string().required(),
            nickname: celebrate_1.Joi.string().required(),
            robotType: celebrate_1.Joi.string().required(),
            serialNumber: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.createRobot(req, res, next));
    //API PATCH request - deactivate a Robot
    route.patch('/deactivate', (0, authorizeRole_1.default)(config_1.default.permissions.robot.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.deactivateRobot(req, res, next));
    //API GET request - list all Robots
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.robot.get), (req, res, next) => ctrl.listRobots(req, res, next));
    //API GET request - find robot by nickname
    route.get('/findByNickname', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            nickname: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.findRobotByNickname(req, res, next));
    // API GET request - retrieve robots by nickname or taskType
    route.get('/retrieve', (0, celebrate_1.celebrate)({
        query: celebrate_1.Joi.object({
            nickname: celebrate_1.Joi.string(),
            taskType: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.findRobotsByNicknameOrTaskType(req, res, next));
};
//# sourceMappingURL=robotRoute.js.map