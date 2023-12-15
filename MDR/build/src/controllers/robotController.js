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
let RobotController = class RobotController {
    constructor(robotServiceInstance) {
        this.robotServiceInstance = robotServiceInstance;
    }
    async createRobot(req, res, next) {
        try {
            const robotOrError = (await this.robotServiceInstance.createRobot(req.body));
            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updateRobot(req, res, next) {
        try {
            const robotOrError = (await this.robotServiceInstance.updateRobot(req.body));
            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async deactivateRobot(req, res, next) {
        try {
            const robotOrError = (await this.robotServiceInstance.deactivateRobot(req.body));
            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async listRobots(req, res, next) {
        try {
            const robotListOrError = (await this.robotServiceInstance.getAllRobots());
            if (robotListOrError.isFailure) {
                return res.status(402).send(robotListOrError.errorValue());
            }
            const robotListDTO = robotListOrError.getValue();
            return res.json(robotListDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async findRobotByNickname(req, res, next) {
        try {
            const robotOrError = (await this.robotServiceInstance.getAllRobotsWithNickname(req.body));
            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async findRobotsByNicknameOrTaskType(req, res, next) {
        try {
            const { nickname, taskType } = req.body;
            // Ensure at least one of the parameters is provided
            if (!nickname && !taskType) {
                return res.status(400).send('Please provide a nickname or a taskType.');
            }
            const robotsOrError = (await this.robotServiceInstance.getRobotsByNicknameOrTaskType(nickname, taskType));
            if (robotsOrError.isFailure) {
                return res.status(402).send(robotsOrError.errorValue());
            }
            const robotDTOs = robotsOrError.getValue();
            return res.json(robotDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
};
RobotController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.robot.name)),
    __metadata("design:paramtypes", [Object])
], RobotController);
exports.default = RobotController;
//# sourceMappingURL=robotController.js.map