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
const building_1 = require("../domain/building");
const BuildingMap_1 = require("../mappers/BuildingMap");
const buildingCode_1 = require("../domain/valueObjects/buildingCode");
const description_1 = require("../domain/valueObjects/description");
let BuildingService = class BuildingService {
    constructor(buildingRepo, floorRepo) {
        this.buildingRepo = buildingRepo;
        this.floorRepo = floorRepo;
    }
    async createBuilding(buildingDTO) {
        try {
            const buildingCodeOrError = buildingCode_1.BuildingCode.create(buildingDTO.code);
            const descriptionOrError = description_1.Description.create(buildingDTO.description);
            // verifies the code and description creation
            if (buildingCodeOrError.isFailure) {
                return Result_1.Result.fail('Invalid Building Code!');
            }
            if (descriptionOrError.isFailure && buildingDTO.description != undefined) {
                return Result_1.Result.fail('Invalid Description!');
            }
            // checks if theres already a Building with the code provided
            const buildingDocument = await this.buildingRepo.findByCode(buildingDTO.code);
            const found = !!buildingDocument;
            if (found) {
                return Result_1.Result.fail('Building already exists with code:' + buildingDTO.code);
            }
            const buildingOrError = await building_1.Building.create(buildingDTO);
            if (buildingOrError.isFailure) {
                return Result_1.Result.fail(buildingOrError.errorValue());
            }
            const buildingResult = buildingOrError.getValue();
            // saves the new created building and returns the building DTO 
            await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(buildingResult);
            return Result_1.Result.ok(buildingDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateBuilding(buildingDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
            const descriptionOrError = description_1.Description.create(buildingDTO.description);
            if (building === null) {
                return Result_1.Result.fail('Building not found with id:' + buildingDTO.id);
            }
            else {
                if (descriptionOrError.isFailure) {
                    return Result_1.Result.fail('Error updating building -> Invalid Description!');
                }
                else {
                    building.description = descriptionOrError.getValue();
                    building.name = buildingDTO.name;
                    await this.buildingRepo.save(building);
                    const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
                    return Result_1.Result.ok(buildingDTOResult);
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getBuildingById(buildingId) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);
            if (building === null) {
                return Result_1.Result.fail('Building with Building ID "' + buildingId + '" not found');
            }
            const buildingDTO = BuildingMap_1.BuildingMap.toDTO(building);
            return Result_1.Result.ok(buildingDTO);
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getAllBuildings() {
        try {
            const buildingList = await this.buildingRepo.findAll();
            let buildingListDto = [];
            if (buildingList != null) {
                for (let i = 0; i < buildingList.length; i++)
                    buildingListDto.push(BuildingMap_1.BuildingMap.toDTO(buildingList[i]));
                return Result_1.Result.ok(buildingListDto);
            }
            return Result_1.Result.fail("There are no buildings to return.");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getAllBuildingsWithMinAndMaxFloors(min, max) {
        try {
            const buildingList = await this.buildingRepo.findAll();
            let buildingListDto = [];
            let buildingListDtoWithMinAndMaxFloors = [];
            let tempBuildingFloorList = [];
            if (isNaN(min) || isNaN(max)) {
                console.error('Invalid min or max values. Please provide valid numbers.');
                return Result_1.Result.fail("Invalid min or max values. Please provide valid numbers.");
            }
            if (buildingList != null) {
                for (let i = 0; i < buildingList.length; i++)
                    buildingListDto.push(BuildingMap_1.BuildingMap.toDTO(buildingList[i]));
            }
            if (buildingListDto != null) {
                for (let i = 0; i < buildingListDto.length; i++) {
                    tempBuildingFloorList = await this.floorRepo.findByBuilding(buildingListDto[i].id);
                    if (tempBuildingFloorList != null) {
                        if (tempBuildingFloorList.length >= min && tempBuildingFloorList.length <= max) {
                            buildingListDtoWithMinAndMaxFloors.push(buildingListDto[i]);
                        }
                    }
                    tempBuildingFloorList = [];
                }
                return Result_1.Result.ok(buildingListDtoWithMinAndMaxFloors);
            }
            return Result_1.Result.fail("There are no buildings to return.");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
};
BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __metadata("design:paramtypes", [Object, Object])
], BuildingService);
exports.default = BuildingService;
//# sourceMappingURL=buildingService.js.map