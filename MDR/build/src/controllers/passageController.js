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
let PassageController = class PassageController {
    constructor(passageServiceInstance) {
        this.passageServiceInstance = passageServiceInstance;
    }
    async createPassage(req, res, next) {
        try {
            const passageOrError = await this.passageServiceInstance.createPassage(req.body);
            if (passageOrError.isFailure) {
                return res.status(402).send(passageOrError.errorValue());
            }
            const passageDTO = passageOrError.getValue();
            return res.json(passageDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listPassages(req, res, next) {
        try {
            const passagesListOrError = await this.passageServiceInstance.getAllPassages();
            if (passagesListOrError.isFailure) {
                return res.status(402).send(passagesListOrError.errorValue());
            }
            const passageListDTO = passagesListOrError.getValue();
            return res.json(passageListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listPassagesBetweenBuildings(req, res, next) {
        try {
            const passagesListOrError = await this.passageServiceInstance.getAllPassages();
            if (passagesListOrError.isFailure) {
                return res.status(402).send(passagesListOrError.errorValue());
            }
            const passagesList = await this.passageServiceInstance.allPassagesBetweenBuildings(req.body.FromBuildingID, req.body.ToBuildingID, passagesListOrError.getValue());
            return res.json(passagesList.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updatePassage(req, res, next) {
        try {
            const passageOrError = await this.passageServiceInstance.updatePassage(req.body);
            if (passageOrError.isFailure) {
                return res.status(402).send(passageOrError.errorValue());
            }
            const passageDTO = passageOrError.getValue();
            return res.json(passageDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getPassagesByFloor(req, res, next) {
        try {
            let floorId = req.params.floorId;
            const passagesOrError = await this.passageServiceInstance.getPassageByFloorId(floorId);
            if (passagesOrError.isFailure) {
                return res.status(404).send(passagesOrError.errorValue());
            }
            const passages = passagesOrError.getValue();
            return res.json(passages).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
};
PassageController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.passage.name)),
    __metadata("design:paramtypes", [Object])
], PassageController);
exports.default = PassageController;
//# sourceMappingURL=passageController.js.map