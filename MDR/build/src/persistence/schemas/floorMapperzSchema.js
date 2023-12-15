"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FloorMapperzSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    floorId: {
        type: String,
        ref: 'Floor',
        required: [true, 'Please enter Floor ID'],
    },
    fileUrl: {
        type: String,
        required: [true, 'Please enter File URL']
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('FloorMapperz', FloorMapperzSchema);
//# sourceMappingURL=floorMapperzSchema.js.map