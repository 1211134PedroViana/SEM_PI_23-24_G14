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
            new UniqueEntityID(robotType._id)
        );

        robotTypeOrError.isFailure ? console.log(robotTypeOrError.error): '';
        return robotTypeOrError.isSuccess ? robotTypeOrError.getValue(): null;
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