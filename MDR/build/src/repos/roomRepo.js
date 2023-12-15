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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const RoomMap_1 = require("../mappers/RoomMap");
let RoomRepo = class RoomRepo {
    constructor(roomSchema) {
        this.roomSchema = roomSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(room) {
        const idX = room.code instanceof String ? room.code : room.code;
        const query = { RoomId: idX };
        const roomDocument = await this.roomSchema.findOne(query);
        return !!roomDocument === true;
    }
    async save(room) {
        const query = { domainId: room.id.toString() };
        const roomDocument = await this.roomSchema.findOne(query);
        try {
            if (roomDocument === null) {
                const rawRoom = RoomMap_1.RoomMap.toPersistence(room);
                const roomCreated = await this.roomSchema.create(rawRoom);
                return RoomMap_1.RoomMap.toDomain(roomCreated);
            }
            else {
                roomDocument.location.positionX = room.location.positionX;
                roomDocument.location.positionY = room.location.positionY;
                roomDocument.location.direction = room.location.direction;
                await roomDocument.save();
                return room;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(roomId) {
        const query = { domainId: roomId };
        const roomRecord = await this.roomSchema.findOne(query);
        if (roomRecord != null) {
            return RoomMap_1.RoomMap.toDomain(roomRecord);
        }
        else
            return null;
    }
    async findByObjectId(roomId) {
        const query = { _id: roomId };
        const roomRecord = await this.roomSchema.findOne(query);
        if (roomRecord != null) {
            return RoomMap_1.RoomMap.toDomain(roomRecord);
        }
        else
            return null;
    }
    async findAll() {
        const roomList = await this.roomSchema.find();
        return RoomMap_1.RoomMap.toDomainBulk(roomList);
    }
    async findByFloorId(floorId) {
        const rooms = [];
        const query = { floorId };
        const roomRecords = await this.roomSchema.find(query);
        if (roomRecords.length > 0) {
            roomRecords.forEach(roomRecord => {
                const room = RoomMap_1.RoomMap.toDomain(roomRecord);
                rooms.push(room);
            });
            return rooms;
        }
        else {
            return null;
        }
    }
    async findByDescription(description) {
        const query = { description: description };
        const roomRecord = await this.roomSchema.findOne(query);
        if (roomRecord != null) {
            return RoomMap_1.RoomMap.toDomain(roomRecord);
        }
        else
            return null;
    }
};
RoomRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('roomSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RoomRepo);
exports.default = RoomRepo;
//# sourceMappingURL=roomRepo.js.map