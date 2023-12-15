"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const buildingSchema = {
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    const floorSchema = {
        name: 'floorSchema',
        schema: '../persistence/schemas/floorSchema',
    };
    const passageSchema = {
        name: 'passageSchema',
        schema: '../persistence/schemas/passageSchema',
    };
    const roomSchema = {
        name: 'roomSchema',
        schema: '../persistence/schemas/roomSchema',
    };
    const robotSchema = {
        name: 'robotSchema',
        schema: '../persistence/schemas/robotSchema',
    };
    const robotTypeSchema = {
        name: 'robotTypeSchema',
        schema: '../persistence/schemas/robotTypeSchema',
    };
    const taskTypeSchema = {
        name: 'taskTypeSchema',
        schema: '../persistence/schemas/taskTypeSchema',
    };
    const elevatorSchema = {
        name: 'elevatorSchema',
        schema: '../persistence/schemas/elevatorSchema',
    };
    const floorMapperzSchema = {
        name: 'floorMapperzSchema',
        schema: '../persistence/schemas/floorMapperzSchema',
    };
    const systemUserMapperzSchema = {
        name: 'systemUserSchema',
        schema: '../persistence/schemas/systemUserSchema',
    };
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path,
    };
    const buildingController = {
        name: config_1.default.controllers.building.name,
        path: config_1.default.controllers.building.path,
    };
    const floorController = {
        name: config_1.default.controllers.floor.name,
        path: config_1.default.controllers.floor.path,
    };
    const passageController = {
        name: config_1.default.controllers.passage.name,
        path: config_1.default.controllers.passage.path,
    };
    const roomController = {
        name: config_1.default.controllers.room.name,
        path: config_1.default.controllers.room.path,
    };
    const robotController = {
        name: config_1.default.controllers.robot.name,
        path: config_1.default.controllers.robot.path,
    };
    const robotTypeController = {
        name: config_1.default.controllers.robotType.name,
        path: config_1.default.controllers.robotType.path,
    };
    const taskTypeController = {
        name: config_1.default.controllers.taskType.name,
        path: config_1.default.controllers.taskType.path,
    };
    const elevatorController = {
        name: config_1.default.controllers.elevator.name,
        path: config_1.default.controllers.elevator.path,
    };
    const floorMapperzController = {
        name: config_1.default.controllers.floorMapperz.name,
        path: config_1.default.controllers.floorMapperz.path,
    };
    const systemUserController = {
        name: config_1.default.controllers.systemUser.name,
        path: config_1.default.controllers.systemUser.path,
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path,
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path,
    };
    const buildingRepo = {
        name: config_1.default.repos.building.name,
        path: config_1.default.repos.building.path,
    };
    const floorRepo = {
        name: config_1.default.repos.floor.name,
        path: config_1.default.repos.floor.path,
    };
    const passageRepo = {
        name: config_1.default.repos.passage.name,
        path: config_1.default.repos.passage.path,
    };
    const roomRepo = {
        name: config_1.default.repos.room.name,
        path: config_1.default.repos.room.path,
    };
    const robotRepo = {
        name: config_1.default.repos.robot.name,
        path: config_1.default.repos.robot.path,
    };
    const robotTypeRepo = {
        name: config_1.default.repos.robotType.name,
        path: config_1.default.repos.robotType.path,
    };
    const taskTypeRepo = {
        name: config_1.default.repos.taskType.name,
        path: config_1.default.repos.taskType.path,
    };
    const elevatorRepo = {
        name: config_1.default.repos.elevator.name,
        path: config_1.default.repos.elevator.path,
    };
    const floorMapperzRepo = {
        name: config_1.default.repos.floorMapperz.name,
        path: config_1.default.repos.floorMapperz.path,
    };
    const systemUserRepo = {
        name: config_1.default.repos.systemUser.name,
        path: config_1.default.repos.systemUser.path,
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path,
    };
    const buildingService = {
        name: config_1.default.services.building.name,
        path: config_1.default.services.building.path,
    };
    const floorService = {
        name: config_1.default.services.floor.name,
        path: config_1.default.services.floor.path,
    };
    const passageService = {
        name: config_1.default.services.passage.name,
        path: config_1.default.services.passage.path,
    };
    const roomService = {
        name: config_1.default.services.room.name,
        path: config_1.default.services.room.path,
    };
    const robotService = {
        name: config_1.default.services.robot.name,
        path: config_1.default.services.robot.path,
    };
    const robotTypeService = {
        name: config_1.default.services.robotType.name,
        path: config_1.default.services.robotType.path,
    };
    const taskTypeService = {
        name: config_1.default.services.taskType.name,
        path: config_1.default.services.taskType.path,
    };
    const elevatorService = {
        name: config_1.default.services.elevator.name,
        path: config_1.default.services.elevator.path,
    };
    const floorMapperzService = {
        name: config_1.default.services.floorMapperz.name,
        path: config_1.default.services.floorMapperz.path,
    };
    const systemUserService = {
        name: config_1.default.services.systemUser.name,
        path: config_1.default.services.systemUser.path,
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            buildingSchema,
            floorSchema,
            passageSchema,
            roomSchema,
            robotSchema,
            robotTypeSchema,
            taskTypeSchema,
            elevatorSchema,
            floorMapperzSchema,
            systemUserMapperzSchema,
        ],
        controllers: [
            roleController,
            buildingController,
            floorController,
            passageController,
            roomController,
            robotController,
            robotTypeController,
            taskTypeController,
            elevatorController,
            floorMapperzController,
            systemUserController,
        ],
        repos: [
            roleRepo,
            userRepo,
            buildingRepo,
            floorRepo,
            passageRepo,
            roomRepo,
            robotRepo,
            robotTypeRepo,
            taskTypeRepo,
            elevatorRepo,
            floorMapperzRepo,
            systemUserRepo,
        ],
        services: [
            roleService,
            buildingService,
            floorService,
            passageService,
            roomService,
            robotService,
            robotTypeService,
            taskTypeService,
            elevatorService,
            floorMapperzService,
            systemUserService,
        ],
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map