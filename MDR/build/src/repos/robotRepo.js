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
const robotId_1 = require("../domain/robotId");
const RobotMap_1 = require("../mappers/RobotMap");
let RobotRepo = class RobotRepo {
    constructor(robotSchema) {
        this.robotSchema = robotSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(robot) {
        const idX = robot.id instanceof robotId_1.RobotId ? robot.id.toValue() : robot.id;
        const query = { domainId: idX };
        const robotDocument = await this.robotSchema.findOne(query);
        return !!robotDocument === true;
    }
    async save(robot) {
        const query = { domainId: robot.id.toString() };
        const robotDocument = await this.robotSchema.findOne(query);
        try {
            if (robotDocument === null) {
                const rawRobot = RobotMap_1.RobotMap.toPersistence(robot);
                const robotCreated = await this.robotSchema.create(rawRobot);
                return RobotMap_1.RobotMap.toDomain(robotCreated);
            }
            else {
                robotDocument.isActive = robot.isActive;
                await robotDocument.save();
                return robot;
            }
        }
        catch (e) {
            throw e;
        }
    }
    async findByDomainId(robotId) {
        const query = { domainId: robotId };
        const robotRecord = await this.robotSchema.findOne(query);
        if (robotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(robotRecord);
        }
        else {
            return null;
        }
    }
    async findByObjectId(robotId) {
        const query = { _id: robotId };
        const robotRecord = await this.robotSchema.findOne(query);
        if (robotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(robotRecord);
        }
        else {
            return null;
        }
    }
    async findByCode(code) {
        const query = { code: code };
        const robotRecord = await this.robotSchema.findOne(query);
        if (robotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(robotRecord);
        }
        else {
            return null;
        }
    }
    async findByNickname(robotNickname) {
        const query = { nickname: robotNickname.nickname };
        const robotRecord = await this.robotSchema.findOne(query);
        if (robotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(robotRecord);
        }
        else {
            return null;
        }
    }
    async findAll() {
        const robotList = await this.robotSchema.find();
        return RobotMap_1.RobotMap.toDomainBulk(robotList);
    }
    async findByTaskType(taskType) {
        const query = { taskType: taskType };
        const robotList = await this.robotSchema.find(query);
        return RobotMap_1.RobotMap.toDomainBulk(robotList);
    }
    async findByNicknameOrTaskType(robotNickname, taskType) {
        const query = {
            $or: [
                { nickname: robotNickname },
                { taskTypes: taskType } // Assuming taskTypes is an array in your Robot schema
            ]
        };
        const robotRecords = await this.robotSchema.find(query);
        return RobotMap_1.RobotMap.toDomainBulk(robotRecords);
    }
};
RobotRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('robotSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RobotRepo);
exports.default = RobotRepo;
//# sourceMappingURL=robotRepo.js.map