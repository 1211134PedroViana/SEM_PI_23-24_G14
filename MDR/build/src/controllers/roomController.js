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
let RoomController = class RoomController {
    constructor(roomServiceInstance) {
        this.roomServiceInstance = roomServiceInstance;
    }
    async createRoom(req, res, next) {
        try {
            const roomOrError = await this.roomServiceInstance.createRoom(req.body);
            if (roomOrError.isFailure) {
                return res.status(402).send(roomOrError.errorValue());
            }
            const elevatorDTO = roomOrError.getValue();
            return res.json(elevatorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updateRoom(req, res, next) {
        try {
            const roomOrError = await this.roomServiceInstance.updateRoom(req.body);
            if (roomOrError.isFailure) {
                return res.status(402).send(roomOrError.errorValue());
            }
            const roomDTO = roomOrError.getValue();
            return res.json(roomDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listRoom(req, res, next) {
        try {
            const roomListOrError = await this.roomServiceInstance.getAllRooms();
            if (roomListOrError.isFailure) {
                return res.status(402).send(roomListOrError.errorValue());
            }
            const roomListDTO = roomListOrError.getValue();
            return res.json(roomListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getRoomsByFloor(req, res, next) {
        try {
            let floorId = req.params.floorId;
            const roomsOrError = await this.roomServiceInstance.getRoomsByFloorId(floorId);
            if (roomsOrError.isFailure) {
                return res.status(404).send(roomsOrError.errorValue());
            }
            const rooms = roomsOrError.getValue();
            return res.json(rooms).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
    async getRoomByDescription(req, res, next) {
        try {
            let description = req.params.description;
            const roomOrError = await this.roomServiceInstance.getRoomByDescription(description);
            if (roomOrError.isFailure) {
                return res.status(404).send(roomOrError.errorValue());
            }
            const room = roomOrError.getValue();
            return res.json(room).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
};
RoomController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.room.name)),
    __metadata("design:paramtypes", [Object])
], RoomController);
exports.default = RoomController;
//# sourceMappingURL=roomController.js.map