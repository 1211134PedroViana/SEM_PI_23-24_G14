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
const location_1 = require("../domain/valueObjects/location");
const passage_1 = require("../domain/passage");
const PassageMap_1 = require("../mappers/PassageMap");
const description_1 = require("../domain/valueObjects/description");
let PassageService = class PassageService {
    constructor(passageRepo, floorRepo, buildingRepo) {
        this.passageRepo = passageRepo;
        this.floorRepo = floorRepo;
        this.buildingRepo = buildingRepo;
    }
    async createPassage(passageDTO) {
        try {
            const fromBuilding = await this.buildingRepo.findByDomainId(passageDTO.fromBuildingId);
            const toBuilding = await this.buildingRepo.findByDomainId(passageDTO.toBuildingId);
            const fromFloor = await this.floorRepo.findByDomainId(passageDTO.fromFloorId);
            const toFloor = await this.floorRepo.findByDomainId(passageDTO.toFloorId);
            const locationOrError = location_1.Location.create({
                positionX: passageDTO.location.positionX,
                positionY: passageDTO.location.positionY,
                direction: passageDTO.location.direction,
            });
            const description = description_1.Description.create(passageDTO.description);
            if (fromBuilding === null || fromBuilding === undefined) {
                return Result_1.Result.fail('Building with ID "' + passageDTO.fromBuildingId + '" not found');
            }
            if (toBuilding === null || toBuilding === undefined) {
                return Result_1.Result.fail('Building with ID "' + passageDTO.toBuildingId + '" not found');
            }
            if (fromFloor === null || fromFloor === undefined) {
                return Result_1.Result.fail('Floor with ID "' + passageDTO.fromFloorId + '" not found');
            }
            if (toFloor === null || toFloor === undefined) {
                return Result_1.Result.fail('Floor with ID "' + passageDTO.toFloorId + '" not found');
            }
            if (locationOrError.isFailure) {
                return Result_1.Result.fail('Invalid Location');
            }
            const passageOrError = await passage_1.Passage.create(passageDTO);
            if (passageOrError.isFailure) {
                return Result_1.Result.fail(passageOrError.errorValue());
            }
            const passageResult = passageOrError.getValue();
            await this.passageRepo.save(passageResult);
            const passageDTOResult = PassageMap_1.PassageMap.toDTO(passageResult);
            return Result_1.Result.ok(passageDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getAllPassages() {
        try {
            const passageList = await this.passageRepo.findAll();
            const passageListDto = [];
            if (passageList != null) {
                for (let i = 0; i < passageList.length; i++)
                    passageListDto.push(PassageMap_1.PassageMap.toDTO(passageList[i]));
                return Result_1.Result.ok(passageListDto);
            }
            return Result_1.Result.fail('There are no passages to return.');
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async updatePassage(passageDTO) {
        try {
            const passage = await this.passageRepo.findByDomainId(passageDTO.id);
            const fromBuilding = await this.buildingRepo.findByDomainId(passageDTO.fromBuildingId);
            const toBuilding = await this.buildingRepo.findByDomainId(passageDTO.fromBuildingId);
            const fromFloor = await this.floorRepo.findByDomainId(passageDTO.fromFloorId);
            const toFloor = await this.floorRepo.findByDomainId(passageDTO.toFloorId);
            const location = location_1.Location.create({
                positionX: passageDTO.location.positionX,
                positionY: passageDTO.location.positionY,
                direction: passageDTO.location.direction,
            });
            if (passage === null) {
                return Result_1.Result.fail('Passage not found with id:' + passageDTO.id);
            }
            else {
                if (fromBuilding === null || fromBuilding === undefined) {
                    return Result_1.Result.fail('Building with ID "' + passageDTO.fromBuildingId + '" not found');
                }
                else if (toBuilding === null || toBuilding === undefined) {
                    return Result_1.Result.fail('Building with ID "' + passageDTO.toBuildingId + '" not found');
                }
                else if (fromFloor === null || fromFloor === undefined) {
                    return Result_1.Result.fail('Floor with ID "' + passageDTO.fromFloorId + '" not found');
                }
                else if (toFloor === null || toFloor === undefined) {
                    return Result_1.Result.fail('Floor with ID "' + passageDTO.toFloorId + '" not found');
                }
                else {
                    passage.fromBuildingId = passageDTO.fromBuildingId;
                    passage.toBuildingId = passageDTO.toBuildingId;
                    passage.fromFloorId = passageDTO.fromFloorId;
                    passage.toFloorId = passageDTO.toFloorId;
                    passage.location = location.getValue();
                    await this.passageRepo.save(passage);
                    const passageDTOResult = PassageMap_1.PassageMap.toDTO(passage);
                    return Result_1.Result.ok(passageDTOResult);
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async allPassagesBetweenBuildings(fromBuildingID, toBuildingID, passageDTO) {
        try {
            const passageListDto = [];
            if (passageDTO != null) {
                for (let index = 0; index < passageDTO.length; index++) {
                    const fromFloor = await this.floorRepo.findByDomainId(passageDTO[index].fromFloorId);
                    const toFloor = await this.floorRepo.findByDomainId(passageDTO[index].toFloorId);
                    if ((fromFloor.buildingId == fromBuildingID && toFloor.buildingId == toBuildingID) ||
                        (fromFloor.buildingId == toBuildingID && toFloor.buildingId == fromBuildingID)) {
                        passageListDto.push(passageDTO[index]);
                    }
                }
                return Result_1.Result.ok(passageListDto);
            }
            return Result_1.Result.fail('There are no passages to return.');
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
    async getPassageByFloorId(floorId) {
        try {
            const passageList = await this.passageRepo.findByFloorId(floorId);
            const passageListDto = [];
            if (passageList != null) {
                for (let i = 0; i < passageList.length; i++)
                    passageListDto.push(PassageMap_1.PassageMap.toDTO(passageList[i]));
                return Result_1.Result.ok(passageListDto);
            }
            return Result_1.Result.fail('There are no passages to return.');
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
    async getPassageByDescription(description) {
        try {
            const passage = await this.passageRepo.findByDescription(description);
            if (passage === null) {
                return Result_1.Result.fail("Elevator not found with description:" + description);
            }
            const passageDTO = PassageMap_1.PassageMap.toDTO(passage);
            return Result_1.Result.ok(passageDTO);
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
};
PassageService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.passage.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], PassageService);
exports.default = PassageService;
//# sourceMappingURL=passageService.js.map