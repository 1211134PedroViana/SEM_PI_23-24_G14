import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const roles = {
  ADMIN : "Admin",
  USER: "User",
  CAMPUS_MANAGER: "Campus",
  FLEET_MANAGER: "Fleet",
  TASK_MANAGER: "Task"
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb+srv://UserTest:12345@cluster0.jtttt3e.mongodb.net/',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  cookieName: 'CookieOnee-chanUwU',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    passage: {
      name: 'PassageController',
      path: '../controllers/passageController',
    },
    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
    taskType: {
      name: 'TaskTypeController',
      path: '../controllers/taskTypeController',
    },
    floorMapperz: {
      name: 'FloorMapperzController',
      path: '../controllers/floorMapperzController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    systemUser: {
      name: 'SystemUserController',
      path: '../controllers/systemUserController',
    },
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    passage: {
      name: 'PassageRepo',
      path: '../repos/passageRepo',
    },
    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },
    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo',
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
    taskType: {
      name: 'TaskTypeRepo',
      path: '../repos/taskTypeRepo',
    },
    floorMapperz: {
      name: 'FloorMapperzRepo',
      path: '../repos/floorMapperzRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    systemUser: {
      name: 'SystemUserRepo',
      path: '../repos/systemUserRepo',
    },
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },
    passage: {
      name: 'PassageService',
      path: '../services/passageService',
    },
    robot: {
      name: 'RobotService',
      path: '../services/robotService',
    },
    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/robotTypeService',
    },
    taskType: {
      name: 'TaskTypeService',
      path: '../services/taskTypeService',
    },
    floorMapperz: {
      name: 'FloorMapperzService',
      path: '../services/floorMapperzService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },
    systemUser: {
      name: 'systemUserService',
      path: '../services/systemUserService',
    },
  },

  permissions: {
    building: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER, roles.TASK_MANAGER, roles.USER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    },

    floor: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER, roles.TASK_MANAGER, roles.USER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    },

    passage: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER, roles.USER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    },

    room: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER, roles.USER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    },

    elevator: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER, roles.USER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    },

    robot: {
      post: [roles.ADMIN, roles.FLEET_MANAGER],
      get: [roles.ADMIN, roles.FLEET_MANAGER],
      put: [roles.ADMIN, roles.FLEET_MANAGER]
    },

    robotType: {
      post: [roles.ADMIN, roles.FLEET_MANAGER],
      get: [roles.ADMIN, roles.FLEET_MANAGER, roles.TASK_MANAGER],
      put: [roles.ADMIN, roles.FLEET_MANAGER]
    },

    floorMapperz: {
      post: [roles.ADMIN, roles.CAMPUS_MANAGER],
      get: [roles.ADMIN, roles.CAMPUS_MANAGER],
      put: [roles.ADMIN, roles.CAMPUS_MANAGER]
    }

  }
};
