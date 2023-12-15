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
    app.use('/rooms', route);
    route.use(isAuth_1.default);
    route.use(attachCurrentUser_1.default);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.room.name);
    //API POST request - create a new Floor of an existing Building
    route.post('/create', (0, authorizeRole_1.default)(config_1.default.permissions.room.post), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            code: celebrate_1.Joi.string().required(),
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string(),
            dimension: {
                pos1: celebrate_1.Joi.number().required(),
                pos2: celebrate_1.Joi.number().required(),
                pos3: celebrate_1.Joi.number().required(),
                pos4: celebrate_1.Joi.number().required(),
            },
            location: {
                positionX: celebrate_1.Joi.number().required(),
                positionY: celebrate_1.Joi.number().required(),
                direction: celebrate_1.Joi.string().required(),
            },
            floorId: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.createRoom(req, res, next));
    //API PUT request - update data of a Building
    route.put('/update', (0, authorizeRole_1.default)(config_1.default.permissions.room.put), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string(),
            dimension: {
                pos1: celebrate_1.Joi.number(),
                pos2: celebrate_1.Joi.number(),
                pos3: celebrate_1.Joi.number(),
                pos4: celebrate_1.Joi.number(),
            },
            location: {
                positionX: celebrate_1.Joi.number(),
                positionY: celebrate_1.Joi.number(),
                direction: celebrate_1.Joi.string(),
            },
        }),
    }), (req, res, next) => ctrl.updateRoom(req, res, next));
    //API GET request - list all Passages
    route.get('/list', (0, authorizeRole_1.default)(config_1.default.permissions.room.get), (req, res, next) => ctrl.listRoom(req, res, next));
    route.get('/roomsFromFloor/:floorId', (0, authorizeRole_1.default)(config_1.default.permissions.room.get), (req, res, next) => ctrl.getRoomsByFloor(req, res, next));
    route.get('/roomFromDescription/:description', (0, authorizeRole_1.default)(config_1.default.permissions.room.get), (req, res, next) => ctrl.getRoomByDescription(req, res, next));
};
//# sourceMappingURL=roomRoute.js.map