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
const robotTypeCode_1 = require("../domain/valueObjects/robotTypeCode");
const robotTypebrand_1 = require("../domain/valueObjects/robotTypebrand");
const robotTypeModel_1 = require("../domain/valueObjects/robotTypeModel");
const robotType_1 = require("../domain/robotType");
const RobotTypeMap_1 = require("../mappers/RobotTypeMap");
let RobotTypeService = class RobotTypeService {
    constructor(robotTypeRepo, taskTypeRepo) {
        this.robotTypeRepo = robotTypeRepo;
        this.taskTypeRepo = taskTypeRepo;
    }
    async createRobotType(robotTypeDTO) {
        try {
            const robotTypeCodeOrError = robotTypeCode_1.RobotTypeCode.create(robotTypeDTO.code);
            const robotTypeBrandOrError = robotTypebrand_1.RobotTypeBrand.create(robotTypeDTO.brand);
            const robotTypeModelOrError = robotTypeModel_1.RobotTypeModel.create(robotTypeDTO.model);
            for (const item of robotTypeDTO.taskTypes) {
                const taskType = await this.taskTypeRepo.findByDomainId(item);
                if (taskType === null) {
                    return Result_1.Result.fail("TaskType with name: '" + item + "' not found");
                }
            }
            // verifies the code, brand and model creation
            if (robotTypeCodeOrError.isFailure) {
                return Result_1.Result.fail(robotTypeCodeOrError.errorValue());
            }
            if (robotTypeBrandOrError.isFailure) {
                return Result_1.Result.fail(robotTypeBrandOrError.errorValue());
            }
            if (robotTypeModelOrError.isFailure) {
                return Result_1.Result.fail(robotTypeModelOrError.errorValue());
            }
            // checks if theres already a RobotType with the code provided
            const robotTypeDocument = await this.robotTypeRepo.findByCode(robotTypeDTO.code);
            const found = !!robotTypeDocument;
            if (found) {
                return Result_1.Result.fail('RobotType already exists with code:' + robotTypeDTO.code);
            }
            const robotTypeOrError = await robotType_1.RobotType.create(robotTypeDTO);
            if (robotTypeOrError.isFailure) {
                return Result_1.Result.fail(robotTypeOrError.errorValue());
            }
            const robotTypeResult = robotTypeOrError.getValue();
            // saves the new created building and returns the building DTO 
            await this.robotTypeRepo.save(robotTypeResult);
            const robotTypeDTOResult = RobotTypeMap_1.RobotTypeMap.toDTO(robotTypeResult);
            return Result_1.Result.ok(robotTypeDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getAllRobotTypes() {
        try {
            const robotTypeList = await this.robotTypeRepo.findAll();
            let robotTypeDto = [];
            if (robotTypeList != null) {
                for (let i = 0; i < robotTypeList.length; i++)
                    robotTypeDto.push(RobotTypeMap_1.RobotTypeMap.toDTO(robotTypeList[i]));
                return Result_1.Result.ok(robotTypeDto);
            }
            return Result_1.Result.fail("There are no Robot Types to return.");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
};
RobotTypeService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.robotType.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.taskType.name)),
    __metadata("design:paramtypes", [Object, Object])
], RobotTypeService);
exports.default = RobotTypeService;
//# sourceMappingURL=robotTypeService.js.map