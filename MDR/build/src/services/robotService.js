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
const robotCode_1 = require("../domain/valueObjects/robotCode");
const Result_1 = require("../core/logic/Result");
const description_1 = require("../domain/valueObjects/description");
const robot_1 = require("../domain/robot");
const RobotMap_1 = require("../mappers/RobotMap");
let RobotService = class RobotService {
    constructor(robotRepo, robotTypeRepo) {
        this.robotRepo = robotRepo;
        this.robotTypeRepo = robotTypeRepo;
    }
    async createRobot(robotDTO) {
        try {
            const robotCodeOrError = robotCode_1.RobotCode.create(robotDTO.code);
            const descriptionOrError = description_1.Description.create(robotDTO.description);
            const robotType = await this.robotTypeRepo.findByDomainId(robotDTO.robotType);
            //verifies the code and description creation
            if (robotCodeOrError.isFailure) {
                return Result_1.Result.fail('Invalid robot code');
            }
            if (descriptionOrError.isFailure && robotDTO.description != undefined) {
                return Result_1.Result.fail('Invalid Description!');
            }
            if (robotType === null) {
                return Result_1.Result.fail("RobotType with id: '" + robotDTO.robotType + "' not found");
            }
            // checks if theres already a robot with the code provided
            const robotDocument = await this.robotRepo.findByCode(robotDTO.code);
            const found = !!robotDocument;
            if (found) {
                return Result_1.Result.fail('Robot already exists with that code' + robotDTO.code);
            }
            robotDTO.isActive = true;
            const robotOrError = await robot_1.Robot.create(robotDTO);
            if (robotOrError.isFailure) {
                return Result_1.Result.fail(robotOrError.errorValue());
            }
            const robotResult = robotOrError.getValue();
            //saves the new created robot and returns the robot DTO
            await this.robotRepo.save(robotResult);
            const robotDTOResult = RobotMap_1.RobotMap.toDTO(robotResult);
            return Result_1.Result.ok(robotDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async deactivateRobot(robotDTO) {
        try {
            const robot = await this.robotRepo.findByDomainId(robotDTO.id);
            if (robot === null) {
                return Result_1.Result.fail("Robot with ID: '" + robotDTO.id + "' not found");
            }
            // sets the Robot isActive to false
            robot.isActive = false;
            //saves the robot with the update and returns the robot DTO
            await this.robotRepo.save(robot);
            const robotDTOResult = RobotMap_1.RobotMap.toDTO(robot);
            return Result_1.Result.ok(robotDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateRobot(robotDTO) {
        return null;
    }
    async getAllRobots() {
        try {
            const robotList = await this.robotRepo.findAll();
            let robotListDto = [];
            if (robotList != null) {
                for (let i = 0; i < robotList.length; i++)
                    robotListDto.push(RobotMap_1.RobotMap.toDTO(robotList[i]));
                return Result_1.Result.ok(robotListDto);
            }
            return Result_1.Result.fail("There are no robots to return");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getAllRobotsWithNickname(robotNickname) {
        try {
            const robotFound = await this.robotRepo.findByNickname(robotNickname);
            let robotFoundDto;
            if (robotFound != null) {
                robotFoundDto = RobotMap_1.RobotMap.toDTO(robotFound);
                return Result_1.Result.ok(robotFoundDto);
            }
            return Result_1.Result.fail("There are no robots with that nickname");
        }
        catch (e) {
            return Result_1.Result.fail(e.message);
        }
    }
    async getRobotsByNicknameOrTaskType(robotNickname, taskType) {
        try {
            let robots;
            if (taskType) {
                // If taskType is provided, retrieve robots by taskType
                robots = await this.robotRepo.findByNicknameOrTaskType(robotNickname, taskType);
            }
            else {
                // Retrieve robots by nickname
                const robotFound = await this.robotRepo.findByNickname(robotNickname);
                robots = robotFound ? [robotFound] : [];
            }
            const robotDTOs = robots.map(robot => RobotMap_1.RobotMap.toDTO(robot));
            return Result_1.Result.ok(robotDTOs);
        }
        catch (error) {
            return Result_1.Result.fail(error.message);
        }
    }
};
RobotService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.robot.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.robotType.name)),
    __metadata("design:paramtypes", [Object, Object])
], RobotService);
exports.default = RobotService;
//# sourceMappingURL=robotService.js.map