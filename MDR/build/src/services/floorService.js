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
const Result_1 = require("../core/logic/Result");
const description_1 = require("../domain/valueObjects/description");
const floor_1 = require("../domain/floor");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorService = class FloorService {
    constructor(floorRepo, buildingRepo) {
        this.floorRepo = floorRepo;
        this.buildingRepo = buildingRepo;
    }
    async createFloor(floorDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(floorDTO.buildingId);
            const descriptionOrError = description_1.Description.create(floorDTO.description);
            if (building === null) {
                return Result_1.Result.fail('Building with ID "' + floorDTO.buildingId + '" not found');
            }
            if (descriptionOrError.isFailure && floorDTO.description != undefined) {
                return Result_1.Result.fail('Invalid Description!');
            }
            const floorOrError = await floor_1.Floor.create(floorDTO);
            if (floorOrError.isFailure) {
                return Result_1.Result.fail(floorOrError.errorValue());
            }
            const floorResult = floorOrError.getValue();
            await this.floorRepo.save(floorResult);
            const floorDTOResult = FloorMap_1.FloorMap.toDTO(floorResult);
            return Result_1.Result.ok(floorDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateFloor(floorDTO) {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);
            const descriptionOrError = description_1.Description.create(floorDTO.description);
            if (floor === null) {
                return Result_1.Result.fail('Floor not found with id:' + floorDTO.id);
            }
            else {
                if (descriptionOrError.isFailure) {
                    return Result_1.Result.fail('Error updating floor -> Invalid Description!');
                }
                else {
                    floor.floorNumber = floorDTO.floorNumber;
                    floor.description = descriptionOrError.getValue();
                    await this.floorRepo.save(floor);
                    const floorDTOResult = FloorMap_1.FloorMap.toDTO(floor);
                    return Result_1.Result.ok(floorDTOResult);
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllFloors() {
        try {
            const floorList = await this.floorRepo.findAll();
            const floorListDto = [];
            if (floorList != null) {
                for (let i = 0; i < floorList.length; i++)
                    floorListDto.push(FloorMap_1.FloorMap.toDTO(floorList[i]));
                return Result_1.Result.ok(floorListDto);
            }
            return Result_1.Result.fail('There are no floors to return.');
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getFloorsWithPassage(passageDTO) {
        try {
            const floorListDto = [];
            if (passageDTO != null) {
                for (let index = 0; index < passageDTO.length; index++) {
                    const fromFloor = FloorMap_1.FloorMap.toDTO(await this.floorRepo.findByDomainId(passageDTO[index].fromFloorId));
                    if (!floorListDto.includes(fromFloor)) {
                        floorListDto.push(fromFloor);
                    }
                    const toFloor = FloorMap_1.FloorMap.toDTO(await this.floorRepo.findByDomainId(passageDTO[index].toFloorId));
                    if (!floorListDto.includes(toFloor)) {
                        floorListDto.push(toFloor);
                    }
                }
                return Result_1.Result.ok(floorListDto);
            }
            return Result_1.Result.fail('There are no floors to return.');
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
    async getFloorsFromBuilding(buildingId) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);
            if (building === null) {
                return Result_1.Result.fail('Building with ID "' + buildingId + '" not found');
            }
            const floorList = await this.floorRepo.findByBuilding(building.id.toString());
            const floorListDto = [];
            if (floorList != null) {
                for (let i = 0; i < floorList.length; i++)
                    floorListDto.push(FloorMap_1.FloorMap.toDTO(floorList[i]));
                return Result_1.Result.ok(floorListDto);
            }
            return Result_1.Result.fail('There are no floors to return.');
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getFloorById(floorId) {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);
            if (floor === null) {
                return Result_1.Result.fail('Floor with Floor ID "' + floorId + '" not found');
            }
            const floorDTO = FloorMap_1.FloorMap.toDTO(floor);
            return Result_1.Result.ok(floorDTO);
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
};
FloorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object, Object])
], FloorService);
exports.default = FloorService;
//# sourceMappingURL=floorService.js.map