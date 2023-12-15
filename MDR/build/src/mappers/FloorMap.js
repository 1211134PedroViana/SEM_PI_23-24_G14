"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const floor_1 = require("../domain/floor");
class FloorMap extends Mapper_1.Mapper {
    static toDTO(floor) {
        return {
            id: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description.value,
        };
    }
    static toDomain(floor) {
        const floorOrError = floor_1.Floor.create(floor, new UniqueEntityID_1.UniqueEntityID(floor.domainId));
        floorOrError.isFailure ? console.log(floorOrError.getValue()) : '';
        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }
    static toDomainBulk(floorList) {
        var floorListDomain = [];
        var index = 0;
        for (let i = 0; i < floorList.length; i++) {
            const floorOrError = floor_1.Floor.create({
                buildingId: floorList[i].buildingId,
                floorNumber: floorList[i].floorNumber,
                description: floorList[i].description,
            }, new UniqueEntityID_1.UniqueEntityID(floorList[i].domainId));
            if (floorOrError.isSuccess) {
                floorListDomain[index] = floorOrError.getValue();
                index++;
            }
        }
        if (floorListDomain == undefined)
            return null;
        else
            return floorListDomain;
    }
    static toPersistence(floor) {
        return {
            domainId: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description.value,
        };
    }
}
exports.FloorMap = FloorMap;
//# sourceMappingURL=FloorMap.js.map