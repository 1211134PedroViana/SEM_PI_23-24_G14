import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

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
  }

  const elevatorSchema = {
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const passageController = {
    name: config.controllers.passage.name,
    path: config.controllers.passage.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const passageRepo = {
    name: config.repos.passage.name,
    path: config.repos.passage.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const passageService = {
    name: config.services.passage.name,
    path: config.services.passage.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      floorSchema,
      passageSchema,
      elevatorSchema
    ],
    controllers: [
      roleController,
      buildingController,
      floorController,
      passageController,
      elevatorController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      floorRepo,
      passageRepo,
      elevatorRepo
    ],
    services: [
      roleService,
      buildingService,
      floorService,
      passageService,
      elevatorService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
