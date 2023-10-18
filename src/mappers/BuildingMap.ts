import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Building } from "../domain/building";
import IBuildingDTO from "../dto/IBuildingDTO";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";

export class BuildingMap extends Mapper<Building> {

    public static toDTO( building: Building): IBuildingDTO {
        return {
            id: building.id.toString(),
            code: building.code.value,
            description: building.description.value,
            name: building.name,
        } as IBuildingDTO;
    }

    public static toDomain( building: any | Model<IBuildingPersistence & Document> ): Building {

        const buildingOrError = Building.create(
            building,
            new UniqueEntityID(building.domainId)
        );

        buildingOrError.isFailure ? console.log(buildingOrError.getValue()): '';
        return buildingOrError.isSuccess ? buildingOrError.getValue(): null;
    }

    public static toPersistence(building: Building): any {
        return {
            domainId: building.id.toString(),
            code: building.code.value,
            description: building.description.value,
            name: building.name
        }
    }
}