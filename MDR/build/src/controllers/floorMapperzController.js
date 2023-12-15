"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const promises_1 = require("fs/promises");
let FloorMapperzController = class FloorMapperzController {
    constructor(floorMapServiceInstance) {
        this.floorMapServiceInstance = floorMapServiceInstance;
    }
    async loadFloorMap(req, res, next) {
        try {
            const filePath = req.file.path;
            const fileContent = await (0, promises_1.readFile)(filePath, 'utf-8');
            const jsonContent = JSON.parse(fileContent);
            const floorMapOrError = await this.floorMapServiceInstance.loadFloorMap(req.file, jsonContent);
            if (floorMapOrError.isFailure) {
                return res.status(402).send(floorMapOrError.errorValue());
            }
            const floorMapDTO = floorMapOrError.getValue();
            return res.json(floorMapDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getFloorMap(req, res, next) {
        try {
            const floorId = req.params.floorId;
            const floorMapOrError = await this.floorMapServiceInstance.getFloorMap(floorId);
            if (floorMapOrError.isFailure) {
                return res.status(402).send(floorMapOrError.errorValue());
            }
            const floorMapDTO = floorMapOrError.getValue();
            return res.json(floorMapDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
FloorMapperzController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.floorMapperz.name)),
    __metadata("design:paramtypes", [Object])
], FloorMapperzController);
exports.default = FloorMapperzController;
//# sourceMappingURL=floorMapperzController.js.map