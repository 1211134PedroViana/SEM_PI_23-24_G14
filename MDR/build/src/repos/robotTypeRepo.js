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
const robotTypeId_1 = require("../domain/valueObjects/robotTypeId");
const RobotTypeMap_1 = require("../mappers/RobotTypeMap");
let RobotTypeRepo = class RobotTypeRepo {
    constructor(robotTypeSchema) {
        this.robotTypeSchema = robotTypeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(robotType) {
        const idX = robotType.id instanceof robotTypeId_1.RobotTypeId ? robotType.id.toValue() : robotType.id;
        const query = { domainId: idX };
        const robotTypeDocument = await this.robotTypeSchema.findOne(query);
        return !!robotTypeDocument === true;
    }
    async save(robotType) {
        const query = { domainId: robotType.id.toString() };
        const robotTypeDocument = await this.robotTypeSchema.findOne(query);
        try {
            if (robotTypeDocument === null) {
                const rawRobotType = RobotTypeMap_1.RobotTypeMap.toPersistence(robotType);
                const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
                return RobotTypeMap_1.RobotTypeMap.toDomain(robotTypeCreated);
            }
            else {
                await robotTypeDocument.save();
                return robotType;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(robotTypeId) {
        const query = { domainId: robotTypeId };
        const robotTypeRecord = await this.robotTypeSchema.findOne(query);
        if (robotTypeRecord != null) {
            return RobotTypeMap_1.RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
            return null;
    }
    async findByObjectId(robotTypeId) {
        const query = { _id: robotTypeId };
        const robotTypeRecord = await this.robotTypeSchema.findOne(query);
        if (robotTypeRecord != null) {
            return RobotTypeMap_1.RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
            return null;
    }
    async findByCode(code) {
        const query = { code: code };
        const robotTypeRecord = await this.robotTypeSchema.findOne(query);
        if (robotTypeRecord != null) {
            return RobotTypeMap_1.RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
            return null;
    }
    async findAll() {
        const robotTypesList = await this.robotTypeSchema.find();
        return RobotTypeMap_1.RobotTypeMap.toDomainBulk(robotTypesList);
    }
};
RobotTypeRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('robotTypeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RobotTypeRepo);
exports.default = RobotTypeRepo;
//# sourceMappingURL=robotTypeRepo.js.map