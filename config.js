import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://KirinDev:123Lmaopass.@cluster0.jtttt3e.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

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
      name: "RoleController",
      path: "../controllers/roleController"
    },
    building: {
      name: "BuildingController",
      path: "../controllers/buildingController"
    },
    floor: {
      name: "FloorController",
      path: "../controllers/floorController"
    },
    passage: {
      name: "PassageController",
      path: "../controllers/passageController"
    },
    elevator: {
      name: "ElevatorController",
      path: "../controllers/elevatorController"
    },
    room: {
      name: "RoomController",
      path: "../controllers/roomController"
    }

    
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
    floor: {
      name: "FloorRepo",
      path: "../repos/floorRepo"
    },
    passage: {
      name: "PassageRepo",
      path: "../repos/passageRepo"
    },
    elevator: {
      name: "ElevatorRepo",
      path: "../repos/elevatorRepo"
    },
    room: {
      name: "RoomRepo",
      path: "../repos/roomRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    passage: {
      name: "PassageService",
      path: "../services/passageService"
    },
    elevator: {
      name: "ElevatorService",
      path: "../services/elevatorService"
    },
    room: {
      name: "RoomService",
      path: "../services/roomService"
    }
  },
};
