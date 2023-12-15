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
let FloorController = class FloorController {
    constructor(floorServiceInstance, passageServiceInstance) {
        this.floorServiceInstance = floorServiceInstance;
        this.passageServiceInstance = passageServiceInstance;
    }
    async createFloor(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body);
            if (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updateFloor(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.body);
            if (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listFloors(req, res, next) {
        try {
            const floorListOrError = await this.floorServiceInstance.getAllFloors();
            if (floorListOrError.isFailure) {
                return res.status(402).send(floorListOrError.errorValue());
            }
            const floorListDTO = floorListOrError.getValue();
            return res.json(floorListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listFloorsWithPassage(req, res, next) {
        try {
            const passageListOrError = await this.passageServiceInstance.getAllPassages();
            if (passageListOrError.isFailure) {
                return res.status(402).send(passageListOrError.errorValue());
            }
            const resultList = await this.floorServiceInstance.getFloorsWithPassage(passageListOrError.getValue());
            const floorListDTO = resultList.getValue();
            return res.json(floorListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listFloorsFromBuilding(req, res, next) {
        try {
            const buildingId = req.params.buildingId;
            const floorListOrError = await this.floorServiceInstance.getFloorsFromBuilding(buildingId);
            if (floorListOrError.isFailure) {
                return res.status(402).send(floorListOrError.errorValue());
            }
            const floorListDTO = floorListOrError.getValue();
            return res.json(floorListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getFloorById(req, res, next) {
        try {
            let floorId = req.params.floorId;
            const floorOrError = (await this.floorServiceInstance.getFloorById(floorId));
            if (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
FloorController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.floor.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.services.passage.name)),
    __metadata("design:paramtypes", [Object, Object])
], FloorController);
exports.default = FloorController;
//# sourceMappingURL=floorController.js.map