import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Floor } from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import {Building} from "../domain/building";
import IBuildingDTO from "../dto/IBuildingDTO";
import {Joi} from "celebrate";

export class FloorMap extends Mapper<Floor> {

    public static toDTO( floor: Floor): IFloorDTO {
        return {
            id: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description.value,
        } as IFloorDTO;
    }

    public static toDomain( floor: any | Model<IFloorPersistence & Document> ): Floor {
        
        const floorOrError = Floor.create(
            floor,
            new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.getValue()): '';
        return floorOrError.isSuccess ? floorOrError.getValue(): null;
    }

    public static toDomainBulk(floorList: any[]): Floor[] {
        var floorListDomain = [];
        var index = 0;

        for (let i = 0; i < floorList.length; i++) {

            const floorOrError = Floor.create({
                buildingId: floorList[i].buildingId,
                floorNumber: floorList[i].floorNumber,
                description: floorList[i].description,
                //map: floorList[i].map
            } as IFloorDTO, new UniqueEntityID(floorList[i].domainId))

            if (floorOrError.isSuccess){
                floorListDomain[index] = floorOrError.getValue();
                index++;
            }

        }

        if (floorListDomain == undefined)
            return null;
        else
            return floorListDomain;
    }

    public static toPersistence(floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description.value,
            //map: floor.cell.floorNumber,

        }
    }
}