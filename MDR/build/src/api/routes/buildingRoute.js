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
    app.use('/buildings', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.building.name);
    //API POST request - create a new Building
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.building.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            code: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string(),
            name: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.createBuilding(req, res, next));
    //API PUT request - update data of a Building
    route.put('/update', (0, authorizeRole_1.default)(config_1.default.permissions.building.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string(),
            name: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
    //API GET request - llist all Buildings
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.building.get), (req, res, next) => ctrl.listBuildings(req, res, next));
    //API GET request - list all Buildings with min and max floors
    route.get('/listAllBuildignsWithMinAndMaxFloors/Min/:min/Max/:max', (0, authorizeRole_1.default)(config_1.default.permissions.building.get), (req, res, next) => ctrl.listBuildingsWithMinAndMaxFloors(req, res, next));
    //API GET request - get Building by buildingId
    route.get('/buildingById/:buildingId', (0, authorizeRole_1.default)(config_1.default.permissions.building.get), (req, res, next) => ctrl.getBuildingById(req, res, next));
};
//# sourceMappingURL=buildingRoute.js.map