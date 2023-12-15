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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const Result_1 = require("../core/logic/Result");
const description_1 = require("../domain/valueObjects/description");
const taskType_1 = require("../domain/taskType");
const TaskTypeMap_1 = require("../mappers/TaskTypeMap");
let TaskTypeService = class TaskTypeService {
    constructor(taskTypeRepo) {
        this.taskTypeRepo = taskTypeRepo;
    }
    async createTaskType(taskTypeDTO) {
        try {
            const taskTypeDescriptionOrError = description_1.Description.create(taskTypeDTO.description);
            if (taskTypeDescriptionOrError.isFailure) {
                return Result_1.Result.fail(taskTypeDescriptionOrError.errorValue());
            }
            // checks if theres already a RobotType with the code provided
            const taskTypeDocument = await this.taskTypeRepo.findByName(taskTypeDTO.name);
            const found = !!taskTypeDocument;
            if (found) {
                return Result_1.Result.fail('TaskType already exists with code:' + taskTypeDTO.name);
            }
            const taskTypeOrError = await taskType_1.TaskType.create({
                name: taskTypeDTO.name,
                description: taskTypeDescriptionOrError.getValue()
            });
            if (taskTypeOrError.isFailure) {
                return Result_1.Result.fail(taskTypeOrError.errorValue());
            }
            const taskTypeResult = taskTypeOrError.getValue();
            // saves the new created building and returns the building DTO 
            await this.taskTypeRepo.save(taskTypeResult);
            const taskTypeDTOResult = TaskTypeMap_1.TaskTypeMap.toDTO(taskTypeResult);
            return Result_1.Result.ok(taskTypeDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getTaskType(name) {
        try {
            const taskType = await this.taskTypeRepo.findByName(name);
            if (taskType === null) {
                return Result_1.Result.fail('TaskType with Name "' + name + '" not found');
            }
            const taskTypeDTOResult = TaskTypeMap_1.TaskTypeMap.toDTO(taskType);
            return Result_1.Result.ok(taskTypeDTOResult);
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getTaskTypeById(taskTypeId) {
        try {
            const taskType = await this.taskTypeRepo.findByDomainId(taskTypeId);
            if (taskType === null) {
                return Result_1.Result.fail('TaskType with ID "' + taskTypeId + '" not found');
            }
            const taskTypeDTOResult = TaskTypeMap_1.TaskTypeMap.toDTO(taskType);
            return Result_1.Result.ok(taskTypeDTOResult);
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
};
TaskTypeService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.taskType.name)),
    __metadata("design:paramtypes", [Object])
], TaskTypeService);
exports.default = TaskTypeService;
//# sourceMappingURL=taskTypeService.js.map