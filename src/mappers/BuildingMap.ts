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
            new UniqueEntityID(building._id)
        );

        buildingOrError.isFailure ? console.log(buildingOrError.error): '';
        return buildingOrError.isSuccess ? buildingOrError.getValue(): null;
    }

    public static toDomainBulk(buildingList: any[]): Building[] {
        var buildingListDomain = [];        
        var index = 0;
        
        for (let i = 0; i < buildingList.length; i++) {
            const buildingOrError = Building.create({
                code: buildingList[i].code,
                description: buildingList[i].description,
                name: buildingList[i].name
            }, new UniqueEntityID(buildingList[i].domainId))

            if (buildingOrError.isSuccess){
                buildingListDomain[index] = buildingOrError.getValue();
                index++;
            }
            
        }

        if (buildingListDomain == undefined)
            return null;
        else
            return buildingListDomain;
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