"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUserMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const systemUser_1 = require("../domain/systemUser");
class SystemUserMap extends Mapper_1.Mapper {
    static toDTO(systemUser) {
        return {
            id: systemUser.id.toString(),
            email: systemUser.email,
            password: systemUser.password,
            role: systemUser.role,
        };
    }
    static toDomain(building) {
        const buildingOrError = systemUser_1.SystemUser.create(building, new UniqueEntityID_1.UniqueEntityID(building.domainId));
        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }
    static toDomainBulk(buildingList) {
        const buildingListDomain = [];
        let index = 0;
        for (let i = 0; i < buildingList.length; i++) {
            const buildingOrError = systemUser_1.SystemUser.create({
                email: buildingList[i].email,
                password: buildingList[i].password,
                role: buildingList[i].role,
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
            code: building.email,
            description: building.password,
            name: building.role,
        };
    }
}
exports.SystemUserMap = SystemUserMap;
//# sourceMappingURL=SystemUserMap.js.map