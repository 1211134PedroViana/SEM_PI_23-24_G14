"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RobotTypeSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true,
        required: [true, 'Please enter RobotType Code']
    },
    brand: {
        type: String,
        required: [true, 'Please enter RobotType Brand']
    },
    model: {
        type: String,
        required: [true, 'Please enter RobotType Model']
    },
    taskTypes: [
        {
            type: String,
            ref: 'TaskType',
            required: [true, 'Please enter TaskTypes']
        }
    ]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('RobotType', RobotTypeSchema);
//# sourceMappingURL=robotTypeSchema.js.map