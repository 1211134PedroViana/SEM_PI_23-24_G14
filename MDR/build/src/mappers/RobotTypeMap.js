"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotTypeMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const robotType_1 = require("../domain/robotType");
class RobotTypeMap extends Mapper_1.Mapper {
    static toDTO(robotType) {
        return {
            id: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            taskTypes: robotType.taskTypes
        };
    }
    static toDomain(robotType) {
        const robotTypeOrError = robotType_1.RobotType.create(robotType, new UniqueEntityID_1.UniqueEntityID(robotType.domainId));
        robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';
        return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
    }
    static toDomainBulk(robotTypeList) {
        var robotTypeListDomain = [];
        var index = 0;
        for (let i = 0; i < robotTypeList.length; i++) {
            const robotTypeOrError = robotType_1.RobotType.create({
                code: robotTypeList[i].code,
                brand: robotTypeList[i].brand,
                model: robotTypeList[i].model,
                taskTypes: robotTypeList[i].taskTypes
            }, new UniqueEntityID_1.UniqueEntityID(robotTypeList[i].domainId));
            if (robotTypeOrError.isSuccess) {
                robotTypeListDomain[index] = robotTypeOrError.getValue();
                index++;
            }
        }
        if (robotTypeListDomain == undefined)
            return null;
        else
            return robotTypeListDomain;
    }
    static toPersistence(robotType) {
        return {
            domainId: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            taskTypes: robotType.taskTypes
        };
    }
}
exports.RobotTypeMap = RobotTypeMap;
//# sourceMappingURL=RobotTypeMap.js.map