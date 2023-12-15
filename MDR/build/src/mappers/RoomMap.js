"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const room_1 = require("../domain/room");
class RoomMap extends Mapper_1.Mapper {
    static toDTO(room) {
        return {
            id: room.id.toString(),
            code: room.code.value,
            description: room.description.value,
            dimension: {
                pos1: room.dimension.pos1,
                pos2: room.dimension.pos2,
                pos3: room.dimension.pos3,
                pos4: room.dimension.pos4,
            },
            location: {
                positionX: room.location.positionX,
                positionY: room.location.positionY,
                direction: room.location.direction,
            },
            floorId: room.floorId
        };
    }
    static toDomain(room) {
        const roomOrError = room_1.Room.create(room, new UniqueEntityID_1.UniqueEntityID(room.domainId));
        roomOrError.isFailure ? console.log(roomOrError.getValue()) : '';
        return roomOrError.isSuccess ? roomOrError.getValue() : null;
    }
    static toDomainBulk(roomList) {
        var roomListDomain = [];
        var index = 0;
        for (let i = 0; i < roomList.length; i++) {
            const roomOrError = room_1.Room.create({
                code: roomList[i].roomCode,
                name: roomList[i].name,
                description: roomList[i].description,
                dimension: roomList[i].dimension,
                location: roomList[i].location,
                floorId: roomList[i].floorId
            }, new UniqueEntityID_1.UniqueEntityID(roomList[i].domainId));
            if (roomOrError.isSuccess) {
                roomListDomain[index] = roomOrError.getValue();
                index++;
            }
        }
        if (roomListDomain == undefined)
            return null;
        else
            return roomListDomain;
    }
    static toPersistence(room) {
        return {
            domainId: room.id.toString(),
            code: room.code.value,
            name: room.name,
            description: room.description.value,
            dimension: {
                pos1: room.dimension.pos1,
                pos2: room.dimension.pos2,
                pos3: room.dimension.pos3,
                pos4: room.dimension.pos4
            },
            location: {
                positionX: room.location.positionX,
                positionY: room.location.positionY,
                direction: room.location.direction
            },
            floorId: room.floorId
        };
    }
}
exports.RoomMap = RoomMap;
//# sourceMappingURL=RoomMap.js.map