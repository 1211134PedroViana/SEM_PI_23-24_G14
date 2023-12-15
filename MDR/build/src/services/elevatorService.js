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
const elevator_1 = require("../domain/elevator");
const ElevatorMap_1 = require("../mappers/ElevatorMap");
const elevatorCode_1 = require("../domain/valueObjects/elevatorCode");
const description_1 = require("../domain/valueObjects/description");
let ElevatorService = class ElevatorService {
    constructor(elevatorRepo, floorRepo, buildingRepo) {
        this.elevatorRepo = elevatorRepo;
        this.floorRepo = floorRepo;
        this.buildingRepo = buildingRepo;
    }
    async createElevator(elevatorDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);
            for (let i = 0; i < elevatorDTO.floorList.length; i++) {
                const floor = await this.floorRepo.findByDomainId(elevatorDTO.floorList[i]);
                if (floor === null) {
                    return Result_1.Result.fail('Floor with ID "' + elevatorDTO.floorList[i] + '" not found');
                }
                if (floor.buildingId != elevatorDTO.buildingId) {
                    return Result_1.Result.fail('Floor dont belong to Building');
                }
            }
            const codeOrError = elevatorCode_1.ElevatorCode.create(elevatorDTO.code);
            const descriptionOrError = description_1.Description.create(elevatorDTO.description);
            const locationOrError = location_1.Location.create({
                positionX: elevatorDTO.location.positionX,
                positionY: elevatorDTO.location.positionY,
                direction: elevatorDTO.location.direction,
            });
            if (building === null) {
                return Result_1.Result.fail('Building with ID "' + elevatorDTO.buildingId + '" not found');
            }
            if (codeOrError.isFailure) {
                return Result_1.Result.fail('Invalid Code');
            }
            if (locationOrError.isFailure) {
                return Result_1.Result.fail('Invalid Location');
            }
            if (descriptionOrError.isFailure) {
                return Result_1.Result.fail('Invalid Description');
            }
            const elevatorOrError = await elevator_1.Elevator.create(elevatorDTO);
            if (elevatorOrError.isFailure) {
                return Result_1.Result.fail(elevatorOrError.errorValue());
            }
            const elevatorResult = elevatorOrError.getValue();
            await this.elevatorRepo.save(elevatorResult);
            const elevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(elevatorResult);
            return Result_1.Result.ok(elevatorDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateElevator(elevatorDTO) {
        try {
            const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.id);
            const descriptionOrError = description_1.Description.create(elevatorDTO.description);
            if (elevator === null) {
                return Result_1.Result.fail('Building not found with id:' + elevatorDTO.id);
            }
            else {
                if (descriptionOrError.isFailure) {
                    return Result_1.Result.fail('Error updating elevator -> Invalid Description!');
                }
                else {
                    elevator.description = descriptionOrError.getValue();
                    elevator.serialNumber = elevatorDTO.serialNumber;
                    elevator.brand = elevatorDTO.brand;
                    elevator.model = elevatorDTO.model;
                    elevator.buildingId = elevatorDTO.buildingId;
                    await this.elevatorRepo.save(elevator);
                    const elevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(elevator);
                    return Result_1.Result.ok(elevatorDTOResult);
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllElevators() {
        try {
            const elevatorList = await this.elevatorRepo.findAll();
            const elevatorListDto = [];
            if (elevatorList != null) {
                for (let i = 0; i < elevatorList.length; i++)
                    elevatorListDto.push(ElevatorMap_1.ElevatorMap.toDTO(elevatorList[i]));
                return Result_1.Result.ok(elevatorListDto);
            }
            return Result_1.Result.fail('There are no elevators to return.');
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getAllFloorsServedByElevator() {
        try {
            // Retrieve all elevators
            const elevators = await this.elevatorRepo.findAll();
            // Map elevators to buildingId and floors served
            const floorsServedByElevator = elevators.map(elevator => ({
                buildingId: elevator.buildingId,
                floors: elevator.floorList || []
            }));
            return Result_1.Result.ok(floorsServedByElevator);
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
    async getElevatorByBuilding(buildingId) {
        try {
            const elevator = await this.elevatorRepo.findByBuildingId(buildingId);
            if (elevator === null) {
                return Result_1.Result.fail('Elevator with Building ID "' + buildingId + '" not found');
            }
            const elevatorDTO = ElevatorMap_1.ElevatorMap.toDTO(elevator);
            return Result_1.Result.ok(elevatorDTO);
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
};
ElevatorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.elevator.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ElevatorService);
exports.default = ElevatorService;
//# sourceMappingURL=elevatorService.js.map