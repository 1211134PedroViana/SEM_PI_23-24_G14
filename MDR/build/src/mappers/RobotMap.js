"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const robot_1 = require("../domain/robot");
class RobotMap extends Mapper_1.Mapper {
    static toDTO(robot) {
        return {
            id: robot.id.toString(),
            code: robot.code.value,
            nickname: robot.nickname,
            robotType: robot.robotType,
            serialNumber: robot.serialNumber,
            description: robot.description.value,
            isActive: robot.isActive
        };
    }
    static toDomain(robot) {
        const robotOrError = robot_1.Robot.create(robot, new UniqueEntityID_1.UniqueEntityID(robot.domainId));
        robotOrError.isFailure ? console.log(robotOrError) : '';
        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }
    static toDomainBulk(robotList) {
        var robotListDomain = [];
        var index = 0;
        for (let i = 0; i < robotList.length; i++) {
            const robotOrError = robot_1.Robot.create({
                code: robotList[i].code,
                nickname: robotList[i].nickname,
                robotType: robotList[i].robotType,
                serialNumber: robotList[i].serialNumber,
                description: robotList[i].description,
                isActive: robotList[i].isActive,
            }, new UniqueEntityID_1.UniqueEntityID(robotList[i].domainId));
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
    static toPersistence(robot) {
        return {
            domainId: robot.id.toString(),
            code: robot.code.value,
            nickname: robot.nickname,
            robotType: robot.robotType,
            serialNumber: robot.serialNumber,
            description: robot.description.value,
            isActive: robot.isActive
        };
    }
}
exports.RobotMap = RobotMap;
//# sourceMappingURL=RobotMap.js.map