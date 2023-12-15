"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FloorSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    buildingId: {
        type: String,
        ref: 'Building',
        required: [true, 'Please enter Building ID'],
    },
    floorNumber: {
        type: Number,
        required: [true, 'Please enter Floor Number'],
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Floor', FloorSchema);
//# sourceMappingURL=floorSchema.js.map