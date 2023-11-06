import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IFloorMapperzDTO from "../dto/IFloorMapperzDTO";
import { IFloorMapperzPersistence } from "../dataschema/IFloorMapperzPersistence";
import { FloorMapperz } from "../domain/floorMapperz";

export class FloorMapperzMap extends Mapper<FloorMapperz> {

    
    public static toDTO( floorMapperz: FloorMapperz): IFloorMapperzDTO {
        return {
            id: floorMapperz.id.toString(),
            floorId: floorMapperz.floorId,
            map: floorMapperz.map,
            fMapRooms: floorMapperz.fMapRooms.map((room) => ({
                roomId: room.roomId,
                dimension: {
                    pos1: room.dimension.pos1,
                    pos2: room.dimension.pos2,
                    pos3: room.dimension.pos3,
                    pos4: room.dimension.pos4,
                },
                location: {
                    positionX: room.location.positionX,
                    positionY: room.location.positionY,
                    direction: room.location.direction
                }
            })),
            fMapElevator: {
                elevatorId: floorMapperz.fMapElevator.elevatorId,
                location: {
                    positionX: floorMapperz.fMapElevator.location.positionX,
                    positionY: floorMapperz.fMapElevator.location.positionY,
                    direction: floorMapperz.fMapElevator.location.direction
                }
            },
            fMapPassages: floorMapperz.fMapPassages.map((passage) => ({
                passageId: passage.passageId,
                location: {
                    positionX: passage.location.positionX,
                    positionY: passage.location.positionY,
                    direction: passage.location.direction
                }
            })),
        } as IFloorMapperzDTO;
    }

    public static toDomain( floorMapperz: any | Model<IFloorMapperzPersistence & Document> ): FloorMapperz {

        const floorMapperzOrError = FloorMapperz.create(
            floorMapperz,
            new UniqueEntityID(floorMapperz.domainId)
        );

        floorMapperzOrError.isFailure ? console.log(floorMapperzOrError.getValue()): '';
        return floorMapperzOrError.isSuccess ? floorMapperzOrError.getValue(): null;
    }

    public static toPersistence(floorMapperz: FloorMapperz): any {
        return {
            domainId: floorMapperz.id.toString(),
            floorId: floorMapperz.floorId,
            map: floorMapperz.map,
            fMapRooms: floorMapperz.fMapRooms.map((room) => ({
                roomId: room.roomId,
                dimension: {
                    pos1: room.dimension.pos1,
                    pos2: room.dimension.pos1,
                    pos3: room.dimension.pos1,
                    pos4: room.dimension.pos1,
                },
                location: {
                    positionX: room.location.positionX,
                    positionY: room.location.positionY,
                    direction: room.location.direction
                }
            })),
            fMapElevator: {
                elevatorId: floorMapperz.fMapElevator.elevatorId,
                location: {
                    positionX: floorMapperz.fMapElevator.location.positionX,
                    positionY: floorMapperz.fMapElevator.location.positionY,
                    direction: floorMapperz.fMapElevator.location.direction
                }
            },
            fMapPassages: floorMapperz.fMapPassages.map((passage) => ({
                passageId: passage.passageId,
                location: {
                    positionX: passage.location.positionX,
                    positionY: passage.location.positionY,
                    direction: passage.location.direction
                }
            })), 
        }
    }
    
}