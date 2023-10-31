import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Robot } from "../domain/robot";
import IRobotDTO from "../dto/IRobotDTO";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";


export class RobotMap extends Mapper<Robot> {

    public static toDTO( robot: Robot): IRobotDTO {
        
        return {
            id: robot.id.toString(),
            code: robot.code.value,
            nickname: robot.nickname,
            robotType: robot.robotType,
            serialNumber: robot.serialNumber,
            description: robot.description.value,
            isActive: robot.isActive
        } as IRobotDTO;
    }

        public static toDomain (robot: any | Model<IRobotPersistence & Document> ): Robot {
            
            const robotOrError = Robot.create(
                robot,
                new UniqueEntityID(robot.domainId)
            );

            robotOrError.isFailure ? console.log(robotOrError): '';
            return robotOrError.isSuccess ? robotOrError.getValue(): null;
        }

        
        public static toDomainBulk(robotList: any[]): Robot[] {
            var robotListDomain = [];
            var index = 0;

            for (let i = 0; i < robotList.length; i++) {
                const robotOrError = Robot.create({
                    code: robotList[i].code,
                    nickname: robotList[i].nickname,
                    robotType: robotList[i].robotType,
                    serialNumber: robotList[i].serialNumber,
                    description: robotList[i].description,
                    isActive: robotList[i].isActive,
                } as IRobotDTO, new UniqueEntityID(robotList[i].domainId))

                if (robotOrError.isSuccess) {
                    robotListDomain[index] = robotOrError.getValue();
                    index++;
                }
            }
            if (robotListDomain == undefined)
            return null;
                else
            return robotListDomain;
    }
    

    public static toPersistence(robot: Robot): any {
        return {
            domainId: robot.id.toString(),
            code: robot.code.value,
            nickname: robot.nickname,
            robotType: robot.robotType,
            serialNumber: robot.serialNumber,
            description: robot.description.value,
            isActive: robot.isActive
        }
    }
}