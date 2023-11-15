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
            fileUrl: floorMapperz.fileUrl
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
            fileUrl: floorMapperz.fileUrl 
        }
    }
    
}