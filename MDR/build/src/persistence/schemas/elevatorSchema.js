"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ElevatorSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    location: {
        positionX: {
            type: Number,
            required: true,
        },
        positionY: {
            type: Number,
            required: true,
        },
        direction: {
            type: String,
            required: true,
        },
    },
    buildingId: {
        type: String,
        ref: 'Building',
        required: true,
    },
    floorList: [
        {
            type: String,
            ref: 'Floor',
            required: true,
        },
    ],
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Elevator', ElevatorSchema);
//# sourceMappingURL=elevatorSchema.js.map