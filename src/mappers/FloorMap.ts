import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Floor } from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";

export class FloorMap extends Mapper<Floor> {

    public static toDTO( floor: Floor): IFloorDTO {
        return {
            id: floor.id.toString(),
            buildingId: floor.building.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description.value,
        } as IFloorDTO;
    }

    public static toDomain( floor: any | Model<IFloorPersistence & Document> ): Floor {

        const floorOrError = Floor.create(
            floor,
            new UniqueEntityID(floor._id)
        );

        floorOrError.isFailure ? console.log(floorOrError.getValue()): '';
        return floorOrError.isSuccess ? floorOrError.getValue(): null;
    }

    public static toPersistence(floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            building: floor.building.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description.value,
            map: floor.cell.floorNumber,

        }
    }
}