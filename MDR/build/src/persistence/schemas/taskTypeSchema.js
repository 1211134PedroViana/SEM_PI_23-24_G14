"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskTypeSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter TaskType name']
    },
    description: {
        type: String,
        required: [true, 'Please enter TaskType description']
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('TaskType', TaskTypeSchema);
//# sourceMappingURL=taskTypeSchema.js.map