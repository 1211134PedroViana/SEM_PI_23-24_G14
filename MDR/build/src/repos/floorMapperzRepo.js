"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const floorMapperzId_1 = require("../domain/floorMapperzId");
const FloorMapperzMap_1 = require("../mappers/FloorMapperzMap");
let FloorMapperzRepo = class FloorMapperzRepo {
    constructor(floorMapperzSchema) {
        this.floorMapperzSchema = floorMapperzSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(floorMapperz) {
        const idX = floorMapperz.floorMapperzId instanceof floorMapperzId_1.FloorMapperzId ? floorMapperz.floorMapperzId.toValue() : floorMapperz.floorMapperzId;
        const query = { FloorMapperzId: idX };
        const floorMapperzDocument = await this.floorMapperzSchema.findOne(query);
        return !!floorMapperzDocument === true;
    }
    async save(floorMapperz) {
        const query = { domainId: floorMapperz.id.toString() };
        const floorMapperzDocument = await this.floorMapperzSchema.findOne(query);
        try {
            if (floorMapperzDocument === null) {
                const rawFloorMap = FloorMapperzMap_1.FloorMapperzMap.toPersistence(floorMapperz);
                const floorMapCreated = await this.floorMapperzSchema.create(rawFloorMap);
                return FloorMapperzMap_1.FloorMapperzMap.toDomain(floorMapCreated);
            }
            else {
                await floorMapperzDocument.save();
                return floorMapperz;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(floorMapId) {
        const query = { domainId: floorMapId };
        const floorMapRecord = await this.floorMapperzSchema.findOne(query);
        if (floorMapRecord != null) {
            return FloorMapperzMap_1.FloorMapperzMap.toDomain(floorMapRecord);
        }
        else
            return null;
    }
    async findByFloorId(floorId) {
        const query = { floorId: floorId };
        const floorMapRecord = await this.floorMapperzSchema.findOne(query);
        if (floorMapRecord != null) {
            return FloorMapperzMap_1.FloorMapperzMap.toDomain(floorMapRecord);
        }
        else
            return null;
    }
};
FloorMapperzRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('floorMapperzSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FloorMapperzRepo);
exports.default = FloorMapperzRepo;
//# sourceMappingURL=floorMapperzRepo.js.map