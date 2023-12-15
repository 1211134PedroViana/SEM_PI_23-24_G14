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
let TaskTypeController = class TaskTypeController {
    constructor(taskTypeServiceInstance) {
        this.taskTypeServiceInstance = taskTypeServiceInstance;
    }
    async createTaskType(req, res, next) {
        try {
            const taskTypeOrError = await this.taskTypeServiceInstance.createTaskType(req.body);
            if (taskTypeOrError.isFailure) {
                return res.status(402).send(taskTypeOrError.errorValue());
            }
            const taskTypeDTO = taskTypeOrError.getValue();
            return res.json(taskTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getTaskType(req, res, next) {
        try {
            const name = req.params.name;
            const taskTypeOrError = await this.taskTypeServiceInstance.getTaskType(name);
            if (taskTypeOrError.isFailure) {
                return res.status(402).send(taskTypeOrError.errorValue());
            }
            const taskTypeDTO = taskTypeOrError.getValue();
            return res.json(taskTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getTaskTypeById(req, res, next) {
        try {
            const taskTypeId = req.params.taskTypeId;
            const taskTypeOrError = await this.taskTypeServiceInstance.getTaskTypeById(taskTypeId);
            if (taskTypeOrError.isFailure) {
                return res.status(402).send(taskTypeOrError.errorValue());
            }
            const taskTypeDTO = taskTypeOrError.getValue();
            return res.json(taskTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
TaskTypeController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.taskType.name)),
    __metadata("design:paramtypes", [Object])
], TaskTypeController);
exports.default = TaskTypeController;
//# sourceMappingURL=taskTypeController.js.map