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
const floorMapperz_1 = require("../domain/floorMapperz");
const FloorMapperzMap_1 = require("../mappers/FloorMapperzMap");
let FloorMapperzService = class FloorMapperzService {
    constructor(floorMapperzRepo, floorRepo, passageRepo, roomRepo, elevatorRepo) {
        this.floorMapperzRepo = floorMapperzRepo;
        this.floorRepo = floorRepo;
        this.passageRepo = passageRepo;
        this.roomRepo = roomRepo;
        this.elevatorRepo = elevatorRepo;
    }
    async loadFloorMap(file, floorMapperzDTO) {
        try {
            const fileUrl = "assets/mazes/" + file.originalname;
            floorMapperzDTO.fileUrl = fileUrl;
            const floor = await this.floorRepo.findByDomainId(floorMapperzDTO.floorId);
            const elevator = await this.elevatorRepo.findByDomainId(floorMapperzDTO.floorElevator.elevatorId);
            if (floor === null) {
                return Result_1.Result.fail('Floor with ID "' + floorMapperzDTO.floorId + '" not found');
            }
            if (elevator === null) {
                return Result_1.Result.fail('Elevator with ID "' + floorMapperzDTO.floorElevator.elevatorId + '" not found');
            }
            for (let i = 0; i < floorMapperzDTO.room.length; i++) {
                let room = await this.roomRepo.findByDomainId(floorMapperzDTO.room[i].roomId);
                if (room === null) {
                    return Result_1.Result.fail('Room with ID "' + floorMapperzDTO.room[i].roomId + '" not found');
                }
            }
            if (floorMapperzDTO.passage != undefined) {
                for (let i = 0; i < floorMapperzDTO.passage.length; i++) {
                    let passage = await this.passageRepo.findByDomainId(floorMapperzDTO.passage[i].passageId);
                    if (passage === null) {
                        return Result_1.Result.fail('Passage with ID "' + floorMapperzDTO.passage[i].passageId + '" not found');
                    }
                }
            }
            const floorMapperzOrError = floorMapperz_1.FloorMapperz.create({
                floorId: floorMapperzDTO.floorId,
                fileUrl: floorMapperzDTO.fileUrl
            });
            if (floorMapperzOrError.isFailure) {
                return Result_1.Result.fail('Failed to load Floor Map');
            }
            await this.floorMapperzRepo.save(floorMapperzOrError.getValue());
            const floorMapDTOResult = FloorMapperzMap_1.FloorMapperzMap.toDTO(floorMapperzOrError.getValue());
            return Result_1.Result.ok(floorMapDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getFloorMap(floorId) {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);
            if (floor === null) {
                return Result_1.Result.fail('Floor with ID "' + floorId + '" not found');
            }
            const floorMap = await this.floorMapperzRepo.findByFloorId(floorId);
            if (floorMap != null) {
                const floorMapDto = FloorMapperzMap_1.FloorMapperzMap.toDTO(floorMap);
                return Result_1.Result.ok(floorMapDto);
            }
            else {
                return Result_1.Result.fail('Floor Map with Floor ID "' + floorId + '" not found');
            }
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
};
FloorMapperzService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.floorMapperz.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.passage.name)),
    __param(3, (0, typedi_1.Inject)(config_1.default.repos.room.name)),
    __param(4, (0, typedi_1.Inject)(config_1.default.repos.elevator.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], FloorMapperzService);
exports.default = FloorMapperzService;
//# sourceMappingURL=floorMapperzService.js.map