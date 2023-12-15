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
const ElevatorMap_1 = require("../mappers/ElevatorMap");
let ElevatorRepo = class ElevatorRepo {
    constructor(elevatorSchema) {
        this.elevatorSchema = elevatorSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(elevator) {
        const idX = elevator.code instanceof String ? elevator.code : elevator.code;
        const query = { PassageId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(query);
        return !!elevatorDocument === true;
    }
    async save(elevator) {
        try {
            const query = { domainId: elevator.id.toString() };
            const elevatorDocument = await this.elevatorSchema.findOne(query);
            if (!elevatorDocument) {
                const rawElevator = ElevatorMap_1.ElevatorMap.toPersistence(elevator);
                const elevatorCreated = await this.elevatorSchema.create(rawElevator);
                return ElevatorMap_1.ElevatorMap.toDomain(elevatorCreated);
            }
            else {
                if (elevator.description && elevator.description.value !== undefined && elevator.description.value !== '') {
                    elevatorDocument.description = elevator.description.value;
                }
                if (elevator.serialNumber) {
                    elevatorDocument.serialNumber = elevator.serialNumber;
                }
                if (elevator.model) {
                    elevatorDocument.model = elevator.model;
                }
                if (elevator.brand) {
                    elevatorDocument.brand = elevator.brand;
                }
                if (elevator.buildingId) {
                    elevatorDocument.buildingId = elevator.buildingId;
                }
                if (elevator.code && elevator.code.value !== undefined) {
                    elevatorDocument.code = elevator.code.value;
                }
                await elevatorDocument.save();
                return ElevatorMap_1.ElevatorMap.toDomain(elevatorDocument);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByObjectId(elevatorId) {
        const query = { _id: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(elevatorRecord);
        }
        else
            return null;
    }
    async findByDomainId(elevatorCode) {
        const query = { domainId: elevatorCode };
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(elevatorRecord);
        }
        else
            return null;
    }
    async findAll() {
        const elevatorList = await this.elevatorSchema.find();
        return ElevatorMap_1.ElevatorMap.toDomainBulk(elevatorList);
    }
    async findByElevatorId(elevatorId) {
        const query = { _id: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(elevatorRecord);
        }
        else {
            return null;
        }
    }
    async findByBuildingId(buildingId) {
        const query = { domainId: buildingId };
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(elevatorRecord);
        }
        else {
            return null;
        }
    }
};
ElevatorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('elevatorSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ElevatorRepo);
exports.default = ElevatorRepo;
//# sourceMappingURL=elevatorRepo.js.map