"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BuildingSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true,
        required: [true, 'Please enter Building Code'],
    },
    description: {
        type: String
    },
    name: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Building', BuildingSchema);
//# sourceMappingURL=buildingSchema.js.map