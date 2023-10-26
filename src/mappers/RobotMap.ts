import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Robot } from "../domain/robot";
import IRobotDTO from "../dto/IRobotDTO";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";
import { publicDecrypt } from "crypto";

export class RobotMap extends Mapper<Robot> {

    public static toDTO( robot: Robot): IRobotDTO {
        return {
            domainId: robot.id.toString(),
            code: robot.code,
            nickname: robot.nickname,
            robotType: robot.robotType,
            serialNumber: robot.serialNumber.valueOf(),
            description: robot.description.value,
            status: robot.status,
        } as IRobotDTO;
    }

        public static toDomain (robot: any | Model<IRobotPersistence & Document> ): Robot {

            const robotOrError = Robot.create(
                robot,
                new UniqueEntityID(robot._id)
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
                    status: robotList[i].status,
                }, new UniqueEntityID(robotList[i].domainId))

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
            code: robot.code,
            nickname: robot.nickname,
            type: robot.robotType,
            description: robot.description.value,
            status: robot.status
        }
    }
}