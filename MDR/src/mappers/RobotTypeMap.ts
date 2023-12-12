import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { RobotType } from "../domain/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { IRobotTypePersistence } from "../dataschema/IRobotTypePersistence";

export class RobotTypeMap extends Mapper<RobotType> {

    public static toDTO( robotType: RobotType): IRobotTypeDTO {

        return {
            id: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            taskTypes: robotType.taskTypes
            
        } as IRobotTypeDTO;
    }

    public static toDomain( robotType: any | Model<IRobotTypePersistence & Document> ): RobotType {

        const robotTypeOrError = RobotType.create(
            robotType,
            new UniqueEntityID(robotType.domainId)
        );

        robotTypeOrError.isFailure ? console.log(robotTypeOrError.error): '';
        return robotTypeOrError.isSuccess ? robotTypeOrError.getValue(): null;
    }

    public static toDomainBulk(robotTypeList: any[]): RobotType[] {
        var robotTypeListDomain = [];        
        var index = 0;
        
        for (let i = 0; i < robotTypeList.length; i++) {
            const robotTypeOrError = RobotType.create({
                code: robotTypeList[i].code,
                brand: robotTypeList[i].brand,
                model: robotTypeList[i].model,
                taskTypes: robotTypeList[i].taskTypes
            } as IRobotTypeDTO , new UniqueEntityID(robotTypeList[i].domainId))

            if (robotTypeOrError.isSuccess){
                robotTypeListDomain[index] = robotTypeOrError.getValue();
                index++;
            }
            
        }

        if (robotTypeListDomain == undefined)
            return null;
        else
            return robotTypeListDomain;
    }

    public static toPersistence(robotType: RobotType): any {
        return {
            domainId: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            taskTypes: robotType.taskTypes
        }
    }
}