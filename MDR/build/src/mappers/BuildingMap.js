"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const building_1 = require("../domain/building");
class BuildingMap extends Mapper_1.Mapper {
    static toDTO(building) {
        return {
            id: building.id.toString(),
            code: building.code.value,
            description: building.description.value,
            name: building.name,
        };
    }
    static toDomain(building) {
        const buildingOrError = building_1.Building.create(building, new UniqueEntityID_1.UniqueEntityID(building.domainId));
        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }
    static toDomainBulk(buildingList) {
        var buildingListDomain = [];
        var index = 0;
        for (let i = 0; i < buildingList.length; i++) {
            const buildingOrError = building_1.Building.create({
                code: buildingList[i].code,
                description: buildingList[i].description,
                name: buildingList[i].name
            }, new UniqueEntityID_1.UniqueEntityID(buildingList[i].domainId));
            if (buildingOrError.isSuccess) {
                buildingListDomain[index] = buildingOrError.getValue();
                index++;
            }
        }
        if (buildingListDomain == undefined)
            return null;
        else
            return buildingListDomain;
    }
    static toPersistence(building) {
        return {
            domainId: building.id.toString(),
            code: building.code.value,
            description: building.description.value,
            name: building.name
        };
    }
}
exports.BuildingMap = BuildingMap;
//# sourceMappingURL=BuildingMap.js.map