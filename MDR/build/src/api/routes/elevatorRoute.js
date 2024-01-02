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
    app.use('/elevators', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.elevator.name);
    //API POST request - create a new Elevator
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.elevator.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            code: celebrate_1.Joi.string().required(),
            location: {
                positionX: celebrate_1.Joi.number().required(),
                positionY: celebrate_1.Joi.number().required(),
                direction: celebrate_1.Joi.string().required(),
            },
            buildingId: celebrate_1.Joi.string().required(),
            floorList: celebrate_1.Joi.array()
                .items(celebrate_1.Joi.string().required())
                .required(),
            brand: celebrate_1.Joi.string(),
            model: celebrate_1.Joi.string(),
            serialNumber: celebrate_1.Joi.string(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.createElevator(req, res, next));
    //API PUT request - update data of a Building
    route.put('/update', (0, authorizeRole_1.default)(config_1.default.permissions.elevator.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            code: celebrate_1.Joi.string(),
            location: {
                positionX: celebrate_1.Joi.number(),
                positionY: celebrate_1.Joi.number(),
                direction: celebrate_1.Joi.string(),
            },
            buildingId: celebrate_1.Joi.string(),
            floorList: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
            brand: celebrate_1.Joi.string(),
            model: celebrate_1.Joi.string(),
            serialNumber: celebrate_1.Joi.string(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.updateElevator(req, res, next));
    //API GET request - list all Elevators
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.elevator.get), (req, res, next) => ctrl.listElevators(req, res, next));
    // API GET request - list floors served by an Elevator
    route.get('/elevatorsByFloor', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            elevatorId: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.listAllFloorsServedByElevator(req, res, next));
    route.get('/elevatorFromBuilding/:buildingId', (0, authorizeRole_1.default)(config_1.default.permissions.elevator.get), (req, res, next) => ctrl.getElevatorByBuilding(req, res, next));
    route.get('/elevatorFromDescription/:description', (0, authorizeRole_1.default)(config_1.default.permissions.elevator.get), (req, res, next) => ctrl.getElevatorByDescription(req, res, next));
};
//# sourceMappingURL=elevatorRoute.js.map