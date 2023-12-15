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
    app.use('/floors', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.floor.name);
    //API POST request - create a new Floor of a existing Building
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.floor.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingId: celebrate_1.Joi.string().required(),
            floorNumber: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.createFloor(req, res, next));
    //API PUT request - update data of a Building
    route.put('/update', (0, authorizeRole_1.default)(config_1.default.permissions.floor.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            floorNumber: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.updateFloor(req, res, next));
    //API GET request - list all Buildings
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.floor.get), (req, res, next) => ctrl.listFloors(req, res, next));
    route.get('/withPassages', (0, authorizeRole_1.default)(config_1.default.permissions.floor.get), (req, res, next) => ctrl.listFloorsWithPassage(req, res, next));
    route.get('/fromBuilding/:buildingId', (0, authorizeRole_1.default)(config_1.default.permissions.floor.get), (req, res, next) => ctrl.listFloorsFromBuilding(req, res, next));
    //API GET request - get Floor by floorId
    route.get('/floorById/:floorId', (0, authorizeRole_1.default)(config_1.default.permissions.floor.get), (req, res, next) => ctrl.getFloorById(req, res, next));
};
//# sourceMappingURL=floorRoute.js.map