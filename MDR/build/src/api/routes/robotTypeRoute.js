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
    app.use('/robotTypes', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.robotType.name);
    //API POST request - create a new RobotType
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.robotType.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            code: celebrate_1.Joi.string().required(),
            brand: celebrate_1.Joi.string().required(),
            model: celebrate_1.Joi.string().required(),
            taskTypes: celebrate_1.Joi.array().items(celebrate_1.Joi.string().required()).required()
        })
    }), (req, res, next) => ctrl.createRobotType(req, res, next));
    //API GET request - list all Robot Types
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.robotType.get), (req, res, next) => ctrl.getAllRobotTypes(req, res, next));
};
//# sourceMappingURL=robotTypeRoute.js.map