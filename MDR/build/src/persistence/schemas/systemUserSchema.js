"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const systemUserSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter Email'],
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('SystemUser', systemUserSchema);
//# sourceMappingURL=systemUserSchema.js.map