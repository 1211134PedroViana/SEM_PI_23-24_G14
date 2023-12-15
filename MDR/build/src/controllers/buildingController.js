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
let BuildingController = class BuildingController {
    constructor(buildingServiceInstance) {
        this.buildingServiceInstance = buildingServiceInstance;
    }
    async createBuilding(req, res, next) {
        try {
            const buildingOrError = (await this.buildingServiceInstance.createBuilding(req.body));
            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }
            const buildingDTO = buildingOrError.getValue();
            return res.json(buildingDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updateBuilding(req, res, next) {
        try {
            const buildingOrError = (await this.buildingServiceInstance.updateBuilding(req.body));
            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }
            const buildingDTO = buildingOrError.getValue();
            return res.json(buildingDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listBuildings(req, res, next) {
        try {
            const buildingListOrError = (await this.buildingServiceInstance.getAllBuildings());
            if (buildingListOrError.isFailure) {
                return res.status(402).send(buildingListOrError.errorValue());
            }
            const buildingListDTO = buildingListOrError.getValue();
            return res.json(buildingListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listBuildingsWithMinAndMaxFloors(req, res, next) {
        try {
            const min = parseInt(req.params.min, 10);
            const max = parseInt(req.params.max, 10);
            const buildingListOrError = (await this.buildingServiceInstance.getAllBuildingsWithMinAndMaxFloors(min, max));
            if (buildingListOrError.isFailure) {
                return res.status(402).send(buildingListOrError.errorValue());
            }
            const buildingListDTO = buildingListOrError.getValue();
            return res.json(buildingListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getBuildingById(req, res, next) {
        try {
            let buildingId = req.params.buildingId;
            const buildingOrError = (await this.buildingServiceInstance.getBuildingById(buildingId));
            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }
            const buildingDTO = buildingOrError.getValue();
            return res.json(buildingDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
BuildingController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.building.name)),
    __metadata("design:paramtypes", [Object])
], BuildingController);
exports.default = BuildingController;
//# sourceMappingURL=buildingController.js.map