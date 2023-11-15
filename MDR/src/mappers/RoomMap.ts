import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IRoomDTO from "../dto/IRoomDTO";
import {Room} from "../domain/room";
import {IRoomPersistence} from "../dataschema/IRoomPersistence";


export class RoomMap extends Mapper<Room> {

    public static toDTO( room: Room): IRoomDTO {
        return {
            id: room.id.toString(),
            code: room.code.value,
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
        } as IRoomDTO;
    }

    public static toDomain( room: any | Model<IRoomPersistence & Document> ): Room {

        const roomOrError = Room.create(room, new UniqueEntityID(room.domainId));

        roomOrError.isFailure ? console.log(roomOrError.getValue()): '';
        return roomOrError.isSuccess ? roomOrError.getValue(): null;
    }

    public static toDomainBulk(roomList: any[]): Room[] {
        var roomListDomain = [];
        var index = 0;

        for (let i = 0; i < roomList.length; i++) {

            const roomOrError = Room.create({
                code: roomList[i].roomCode,
                name: roomList[i].name,
                description: roomList[i].description,
                dimension: roomList[i].dimension,
                location: roomList[i].location,
                floorId: roomList[i].floorId
            } as IRoomDTO, new UniqueEntityID(roomList[i].domainId))

            if (roomOrError.isSuccess){
                roomListDomain[index] = roomOrError.getValue();
                index++;
            }

        }

        if (roomListDomain == undefined)
            return null;
        else
            return roomListDomain;
    }


    public static toPersistence(room: Room): any {
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
        }
    }
}