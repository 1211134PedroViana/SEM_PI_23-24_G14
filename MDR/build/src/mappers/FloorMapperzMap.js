"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMapperzMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const floorMapperz_1 = require("../domain/floorMapperz");
class FloorMapperzMap extends Mapper_1.Mapper {
    static toDTO(floorMapperz) {
        return {
            id: floorMapperz.id.toString(),
            floorId: floorMapperz.floorId,
            fileUrl: floorMapperz.fileUrl
        };
    }
    static toDomain(floorMapperz) {
        const floorMapperzOrError = floorMapperz_1.FloorMapperz.create(floorMapperz, new UniqueEntityID_1.UniqueEntityID(floorMapperz.domainId));
        floorMapperzOrError.isFailure ? console.log(floorMapperzOrError.getValue()) : '';
        return floorMapperzOrError.isSuccess ? floorMapperzOrError.getValue() : null;
    }
    static toPersistence(floorMapperz) {
        return {
            domainId: floorMapperz.id.toString(),
            floorId: floorMapperz.floorId,
            fileUrl: floorMapperz.fileUrl
        };
    }
}
exports.FloorMapperzMap = FloorMapperzMap;
//# sourceMappingURL=FloorMapperzMap.js.map