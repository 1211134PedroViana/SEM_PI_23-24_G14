"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RobotSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true,
        required: [true, 'Please enter robot code'],
    },
    nickname: {
        type: String
    },
    robotType: {
        type: String,
        ref: 'RobotType',
        required: [true, 'Please enter RobotType']
    },
    serialNumber: {
        type: Number
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Robot', RobotSchema);
//# sourceMappingURL=robotSchema.js.map