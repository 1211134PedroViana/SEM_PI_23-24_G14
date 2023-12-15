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
const floorId_1 = require("../domain/floorId");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorRepo = class FloorRepo {
    constructor(floorSchema) {
        this.floorSchema = floorSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(floor) {
        const idX = floor.floorId instanceof floorId_1.FloorId ? floor.floorId.toValue() : floor.floorId;
        const query = { FloorId: idX };
        const floorDocument = await this.floorSchema.findOne(query);
        return !!floorDocument === true;
    }
    async save(floor) {
        const query = { domainId: floor.id };
        const floorDocument = await this.floorSchema.findOne(query);
        try {
            if (floorDocument === null) {
                const rawFloor = FloorMap_1.FloorMap.toPersistence(floor);
                const floorCreated = await this.floorSchema.create(rawFloor);
                return FloorMap_1.FloorMap.toDomain(floorCreated);
            }
            else {
                floorDocument.floorNumber = floor.floorNumber;
                floorDocument.description = floor.description.value;
                await floorDocument.save();
                return floor;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(floorId) {
        const query = { domainId: floorId };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
    async findByFloorNumber(floorNumber) {
        const query = { number: floorNumber };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
    async findByObjectId(floorId) {
        const query = { _id: floorId };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
    async findByBuilding(buildingId) {
        const floors = [];
        const query = { buildingId };
        const floorRecords = await this.floorSchema.find(query);
        if (floorRecords.length > 0) {
            floorRecords.forEach(floorRecord => {
                const floor = FloorMap_1.FloorMap.toDomain(floorRecord);
                floors.push(floor);
            });
            return floors;
        }
        else {
            return null;
        }
    }
    async findAll() {
        const floorList = await this.floorSchema.find();
        return FloorMap_1.FloorMap.toDomainBulk(floorList);
    }
};
FloorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('floorSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FloorRepo);
exports.default = FloorRepo;
//# sourceMappingURL=floorRepo.js.map