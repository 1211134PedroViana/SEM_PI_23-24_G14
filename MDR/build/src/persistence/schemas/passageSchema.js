"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PassageSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true,
    },
    fromBuildingId: {
        type: String,
        ref: 'Building',
        required: [true, 'Please enter Building ID'],
    },
    toBuildingId: {
        type: String,
        ref: 'Building',
        required: [true, 'Please enter Building ID'],
    },
    fromFloorId: {
        type: String,
        ref: 'Floor',
        required: [true, 'Please enter Floor ID'],
    },
    toFloorId: {
        type: String,
        ref: 'Floor',
        required: [true, 'Please enter Floor ID'],
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
    description: {
        type: String
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Passage', PassageSchema);
//# sourceMappingURL=passageSchema.js.map