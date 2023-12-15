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
const room_1 = require("../domain/room");
const description_1 = require("../domain/valueObjects/description");
const RoomCode_1 = require("../domain/valueObjects/RoomCode");
const dimension_1 = require("../domain/valueObjects/dimension");
const RoomMap_1 = require("../mappers/RoomMap");
let RoomService = class RoomService {
    constructor(roomRepo, floorRepo) {
        this.roomRepo = roomRepo;
        this.floorRepo = floorRepo;
    }
    async createRoom(roomDTO) {
        try {
            const floor = await this.floorRepo.findByDomainId(roomDTO.floorId);
            if (floor === null) {
                return Result_1.Result.fail('Floor with ID "' + roomDTO.floorId + '" not found');
            }
            const codeOrError = RoomCode_1.RoomCode.create(roomDTO.code);
            const description = description_1.Description.create(roomDTO.description);
            const dimensionOrError = dimension_1.Dimension.create({
                pos1: roomDTO.dimension.pos1,
                pos2: roomDTO.dimension.pos2,
                pos3: roomDTO.dimension.pos3,
                pos4: roomDTO.dimension.pos4,
            });
            const locationOrError = location_1.Location.create({
                positionX: roomDTO.location.positionX,
                positionY: roomDTO.location.positionY,
                direction: roomDTO.location.direction,
            });
            if (codeOrError.isFailure) {
                return Result_1.Result.fail('Invalid Room Code');
            }
            if (description.isFailure) {
                return Result_1.Result.fail('Invalid Room Description');
            }
            if (dimensionOrError.isFailure) {
                return Result_1.Result.fail('Invalid Dimensions');
            }
            if (locationOrError.isFailure) {
                return Result_1.Result.fail('Invalid Location');
            }
            const roomOrError = await room_1.Room.create(roomDTO);
            if (roomOrError.isFailure) {
                return Result_1.Result.fail(roomOrError.errorValue());
            }
            const roomResult = roomOrError.getValue();
            await this.roomRepo.save(roomResult);
            const roomDTOResult = RoomMap_1.RoomMap.toDTO(roomResult);
            return Result_1.Result.ok(roomDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateRoom(roomDTO) {
        try {
            const room = await this.roomRepo.findByDomainId(roomDTO.id);
            const codeOrError = description_1.Description.create(roomDTO.code);
            if (room === null) {
                return Result_1.Result.fail('Room not found with id:' + roomDTO.id);
            }
            else {
                if (codeOrError.isFailure) {
                    return Result_1.Result.fail('Error updating room -> Invalid Code!');
                }
                else {
                    await this.roomRepo.save(room);
                    const roomDTOTest = RoomMap_1.RoomMap.toDTO(room);
                    return Result_1.Result.ok(roomDTOTest);
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllRooms() {
        try {
            const roomsList = await this.roomRepo.findAll();
            let roomListDto = [];
            if (roomsList != null) {
                for (let i = 0; i < roomsList.length; i++)
                    roomListDto.push(RoomMap_1.RoomMap.toDTO(roomsList[i]));
                return Result_1.Result.ok(roomListDto);
            }
            return Result_1.Result.fail("There are no rooms to return.");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getRoomsByFloorId(floorId) {
        try {
            const roomList = await this.roomRepo.findByFloorId(floorId);
            const roomListDto = [];
            if (roomList != null) {
                for (let i = 0; i < roomList.length; i++)
                    roomListDto.push(RoomMap_1.RoomMap.toDTO(roomList[i]));
                return Result_1.Result.ok(roomListDto);
            }
            return Result_1.Result.fail('There are no rooms to return.');
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
    async getRoomByDescription(description) {
        try {
            const room = await this.roomRepo.findByDescription(description);
            if (room === null) {
                return Result_1.Result.fail("Room not found with description:" + description);
            }
            const roomDTO = RoomMap_1.RoomMap.toDTO(room);
            return Result_1.Result.ok(roomDTO);
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
};
RoomService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.room.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __metadata("design:paramtypes", [Object, Object])
], RoomService);
exports.default = RoomService;
//# sourceMappingURL=roomService.js.map