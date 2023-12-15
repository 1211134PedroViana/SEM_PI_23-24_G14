"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const passage_1 = require("../domain/passage");
class PassageMap extends Mapper_1.Mapper {
    static toDTO(passage) {
        return {
            id: passage.id.toString(),
            fromBuildingId: passage.fromBuildingId,
            toBuildingId: passage.toBuildingId,
            fromFloorId: passage.fromFloorId,
            toFloorId: passage.toFloorId,
            location: {
                positionX: passage.location.positionX,
                positionY: passage.location.positionY,
                direction: passage.location.direction,
            },
            description: passage.description.value
        };
    }
    static toDomain(passage) {
        const passageOrError = passage_1.Passage.create(passage, new UniqueEntityID_1.UniqueEntityID(passage._id));
        passageOrError.isFailure ? console.log(passageOrError.getValue()) : '';
        return passageOrError.isSuccess ? passageOrError.getValue() : null;
    }
    static toDomainBulk(passageList) {
        var passageListDomain = [];
        var index = 0;
        for (let i = 0; i < passageList.length; i++) {
            const passageOrError = passage_1.Passage.create({
                fromBuildingId: passageList[i].fromBuildingId,
                toBuildingId: passageList[i].toBuildingId,
                fromFloorId: passageList[i].fromFloorId,
                toFloorId: passageList[i].toFloorId,
                location: passageList[i].location,
            }, new UniqueEntityID_1.UniqueEntityID(passageList[i].domainId));
            if (passageOrError.isSuccess) {
                passageListDomain[index] = passageOrError.getValue();
                index++;
            }
        }
        if (passageListDomain == undefined)
            return null;
        else
            return passageListDomain;
    }
    static toPersistence(passage) {
        return {
            domainId: passage.id.toString(),
            fromBuildingId: passage.fromBuildingId,
            toBuildingId: passage.toBuildingId,
            fromFloorId: passage.fromFloorId,
            toFloorId: passage.toFloorId,
            location: {
                positionX: passage.location.positionX,
                positionY: passage.location.positionY,
                direction: passage.location.direction,
            },
            description: passage.description.value
        };
    }
}
exports.PassageMap = PassageMap;
//# sourceMappingURL=PassageMap.js.map