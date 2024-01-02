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
    app.use('/passages', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.passage.name);
    //API POST request - create a new Floor of an existing Building
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.passage.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            fromBuildingId: celebrate_1.Joi.string().required(),
            toBuildingId: celebrate_1.Joi.string().required(),
            fromFloorId: celebrate_1.Joi.string().required(),
            toFloorId: celebrate_1.Joi.string().required(),
            location: {
                positionX: celebrate_1.Joi.number().required(),
                positionY: celebrate_1.Joi.number().required(),
                direction: celebrate_1.Joi.string().required(),
            },
        }),
    }), (req, res, next) => ctrl.createPassage(req, res, next));
    //API GET request - list all Passages
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.passage.get), (req, res, next) => ctrl.listPassages(req, res, next));
    //API GET request - list all Passages between 2 buildings
    route.get('/list', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            FromBuildingID: celebrate_1.Joi.string().required(),
            ToBuildingID: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.listPassagesBetweenBuildings(req, res, next));
    //API PUT request - edit a Passage
    route.put('/update', (0, authorizeRole_1.default)(config_1.default.permissions.passage.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            fromBuildingId: celebrate_1.Joi.string().required(),
            toBuildingId: celebrate_1.Joi.string().required(),
            fromFloorId: celebrate_1.Joi.string().required(),
            toFloorId: celebrate_1.Joi.string().required(),
            location: {
                positionX: celebrate_1.Joi.number().required(),
                positionY: celebrate_1.Joi.number().required(),
                direction: celebrate_1.Joi.string().required(),
            },
        }),
    }), (req, res, next) => ctrl.updatePassage(req, res, next));
    route.get('/passagesFromFloor/:floorId', (0, authorizeRole_1.default)(config_1.default.permissions.passage.get), (req, res, next) => ctrl.getPassagesByFloor(req, res, next));
    route.get('/passageFromDescription/:description', (0, authorizeRole_1.default)(config_1.default.permissions.passage.get), (req, res, next) => ctrl.getPassageByDescription(req, res, next));
};
//# sourceMappingURL=passageRoute.js.map