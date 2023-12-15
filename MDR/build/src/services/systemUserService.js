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
const systemUser_1 = require("../domain/systemUser");
const SystemUserMap_1 = require("../mappers/SystemUserMap");
const userEmail_1 = require("../domain/valueObjects/userEmail");
let SystemUserService = class SystemUserService {
    constructor(systemUserRepo) {
        this.systemUserRepo = systemUserRepo;
    }
    async createSystemUser(systemUserDTO) {
        try {
            const taskTypeDescriptionOrError = userEmail_1.UserEmail.create(systemUserDTO.email);
            if (taskTypeDescriptionOrError.isFailure) {
                return Result_1.Result.fail(taskTypeDescriptionOrError.errorValue());
            }
            // checks if theres already a RobotType with the code provided
            const taskTypeDocument = await this.systemUserRepo.findByEmail(systemUserDTO.email);
            const found = !!taskTypeDocument;
            if (found) {
                return Result_1.Result.fail('System User already exists with email:' + systemUserDTO.email);
            }
            const taskTypeOrError = await systemUser_1.SystemUser.create({
                email: systemUserDTO.email,
                role: systemUserDTO.role,
                id: systemUserDTO.id,
                password: systemUserDTO.password
            });
            if (taskTypeOrError.isFailure) {
                return Result_1.Result.fail(taskTypeOrError.errorValue());
            }
            const taskTypeResult = taskTypeOrError.getValue();
            // saves the new created building and returns the building DTO 
            await this.systemUserRepo.save(taskTypeResult);
            const taskTypeDTOResult = SystemUserMap_1.SystemUserMap.toDTO(taskTypeResult);
            return Result_1.Result.ok(taskTypeDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
SystemUserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.systemUser.name)),
    __metadata("design:paramtypes", [Object])
], SystemUserService);
exports.default = SystemUserService;
//# sourceMappingURL=systemUserService.js.map