"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const elevator_1 = require("../domain/elevator");
class ElevatorMap extends Mapper_1.Mapper {
    static toDTO(elevator) {
        return {
            id: elevator.id.toString(),
            code: elevator.code.value,
            location: {
                positionX: elevator.location.positionX,
                positionY: elevator.location.positionY,
                direction: elevator.location.direction,
            },
            buildingId: elevator.buildingId,
            floorList: elevator.floorList,
            brand: elevator.brand,
            model: elevator.model,
            serialNumber: elevator.serialNumber,
            description: elevator.description.value,
        };
    }
    static toDomain(elevator) {
        const elevatorOrError = elevator_1.Elevator.create(elevator, new UniqueEntityID_1.UniqueEntityID(elevator.domainId));
        elevatorOrError.isFailure ? console.log(elevatorOrError.getValue()) : '';
        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }
    static toDomainBulk(elevatorList) {
        const elevatorListDomain = [];
        let index = 0;
        for (let i = 0; i < elevatorList.length; i++) {
            const elevatorOrError = elevator_1.Elevator.create({
                code: elevatorList[i].code,
                location: elevatorList[i].location,
                buildingId: elevatorList[i].buildingId,
                floorList: elevatorList[i].floorList,
                brand: elevatorList[i].brand,
                model: elevatorList[i].model,
                serialNumber: elevatorList[i].serialNumber,
                description: elevatorList[i].description,
            }, new UniqueEntityID_1.UniqueEntityID(elevatorList[i].domainId));
            if (elevatorOrError.isSuccess) {
                elevatorListDomain[index] = elevatorOrError.getValue();
                index++;
            }
        }
        if (elevatorListDomain == undefined)
            return null;
        else
            return elevatorListDomain;
    }
    static toPersistence(elevator) {
        return {
            domainId: elevator.id.toString(),
            code: elevator.code.value,
            location: {
                positionX: elevator.location.positionX,
                positionY: elevator.location.positionY,
                direction: elevator.location.direction,
            },
            buildingId: elevator.buildingId,
            floorList: elevator.floorList,
            brand: elevator.brand,
            model: elevator.model,
            serialNumber: elevator.serialNumber,
            description: elevator.description.value,
        };
    }
}
exports.ElevatorMap = ElevatorMap;
//# sourceMappingURL=ElevatorMap.js.map