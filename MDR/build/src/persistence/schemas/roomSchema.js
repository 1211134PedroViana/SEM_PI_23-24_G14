"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    dimension: {
        pos1: {
            type: Number,
            required: true
        },
        pos2: {
            type: Number,
            required: true
        },
        pos3: {
            type: Number,
            required: true
        },
        pos4: {
            type: Number,
            required: true
        },
    },
    location: {
        positionX: {
            type: Number,
            required: true
        },
        positionY: {
            type: Number,
            required: true
        },
        direction: {
            type: String,
            required: true
        }
    },
    floorId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Room', RoomSchema);
//# sourceMappingURL=roomSchema.js.map