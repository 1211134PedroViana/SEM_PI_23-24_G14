import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Floor } from "../domain/floor";
import IFloorMapperzDTO from "../dto/IFloorMapperzDTO";
import { IFloorMapperzPersistence } from "../dataschema/IFloorMapperzPersistence";
import { FloorMapperz } from "../domain/floorMapperz";

export class FloorMapperzMap extends Mapper<FloorMapperz> {

    /*
    public static toDTO( floorMapperz: FloorMapperz): IFloorMapperzDTO {
        return {
            id: floorMapperz.id.toString(),
            floor: floorMapperz.floor.id.toString(),
            map: floorMapperz.map,
            fMapRooms: floorMapperz.fMapRooms.map((room) => ({
                roomId: room.roomId,
                startX: room.startX,
                startY: room.startY,
                endX: room.endX,
                endY: room.endY,
            })),
            fMapElevator: {
                elevatorId: floorMapperz.fMapElevator.elevatorId,
                positionX: floorMapperz.fMapElevator.positionX,
                positionY: floorMapperz.fMapElevator.positionY,
                direction: floorMapperz.fMapElevator.direction,
            },
            fMapPassages: floorMapperz.fMapPassages.map((passage) => ({
                passageId: passage.passageId,
                positionX: passage.positionX,
                positionY: passage.positionY,
                direction: passage.direction,
            })),
        } as IFloorMapperzDTO;
    }

    public static toDomain( floorMapperz: any | Model<IFloorMapperzPersistence & Document> ): FloorMapperz {

        const floorMapperzOrError = FloorMapperz.create(
            floorMapperz,
            new UniqueEntityID(floorMapperz._id)
        );

        floorMapperzOrError.isFailure ? console.log(floorMapperzOrError.getValue()): '';
        return floorMapperzOrError.isSuccess ? floorMapperzOrError.getValue(): null;
    }

    public static toPersistence(floorMapperz: FloorMapperz): any {
        return {
            domainId: floorMapperz.id.toString(),
            floor: floorMapperz.floor.id.toString(),
            map: floorMapperz.map,
            fMapRooms: floorMapperz.fMapRooms.map((room: Room) => room.id.toString()), 
            fMapElevator: floorMapperz.fMapElevator.id.toString(), 
            fMapPassages: floorMapperz.fMapPassages.map((passage: Passage) => passage.id.toString()), 
        }
    }
    */
}