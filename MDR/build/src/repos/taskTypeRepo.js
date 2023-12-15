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
const taskTypeId_1 = require("../domain/valueObjects/taskTypeId");
const TaskTypeMap_1 = require("../mappers/TaskTypeMap");
let TaskTypeRepo = class TaskTypeRepo {
    constructor(taskTypeSchema) {
        this.taskTypeSchema = taskTypeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(taskType) {
        const idX = taskType.id instanceof taskTypeId_1.TaskTypeId ? taskType.id.toValue() : taskType.id;
        const query = { domainId: idX };
        const taskTypeDocument = await this.taskTypeSchema.findOne(query);
        return !!taskTypeDocument === true;
    }
    async save(taskType) {
        const query = { domainId: taskType.id.toString() };
        const taskTypeDocument = await this.taskTypeSchema.findOne(query);
        try {
            if (taskTypeDocument === null) {
                const rawTaskType = TaskTypeMap_1.TaskTypeMap.toPersistence(taskType);
                const taskTypeCreated = await this.taskTypeSchema.create(rawTaskType);
                return TaskTypeMap_1.TaskTypeMap.toDomain(taskTypeCreated);
            }
            else {
                await taskTypeDocument.save();
                return taskType;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(taskTypeId) {
        const query = { domainId: taskTypeId };
        const taskTypeRecord = await this.taskTypeSchema.findOne(query);
        if (taskTypeRecord != null) {
            return TaskTypeMap_1.TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
            return null;
    }
    async findByObjectId(taskTypeId) {
        const query = { _id: taskTypeId };
        const taskTypeRecord = await this.taskTypeSchema.findOne(query);
        if (taskTypeRecord != null) {
            return TaskTypeMap_1.TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
            return null;
    }
    async findByName(name) {
        const query = { name: name };
        const taskTypeRecord = await this.taskTypeSchema.findOne(query);
        if (taskTypeRecord != null) {
            return TaskTypeMap_1.TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
            return null;
    }
};
TaskTypeRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('taskTypeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TaskTypeRepo);
exports.default = TaskTypeRepo;
//# sourceMappingURL=taskTypeRepo.js.map