"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const path = require('path');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/loadMap', route);
    //route.use(isAuth);
    //route.use(attachCurrentUser);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.floorMapperz.name);
    const projectRoot = path.join(__dirname, '..', '..', '..', '..');
    const MAZES_DESTINATION = path.join(projectRoot, 'SPA', 'src', 'assets', 'mazes');
    const diskStorage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, MAZES_DESTINATION);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const upload = (0, multer_1.default)({ storage: diskStorage });
    //API PATCH request - create a new FloorMap of a existing Floor
    route.patch('', upload.single('file'), (req, res, next) => ctrl.loadFloorMap(req, res, next));
    //API GET request - get Floor Map
    route.get('/:floorId', 
    //authorizeRole(config.permissions.floorMapperz.get),
    (req, res, next) => ctrl.getFloorMap(req, res, next));
};
//# sourceMappingURL=floorMapperzRoute.js.map