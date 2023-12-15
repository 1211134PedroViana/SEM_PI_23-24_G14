"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const axios_1 = __importDefault(require("axios"));
const authorizeRole = (roles) => {
    return async (req, res, next) => {
        const Logger = typedi_1.Container.get('logger');
        try {
            // Check if req.user has the required role
            if (!req.user || !req.user.roleId) {
                return res.status(403).json({ message: 'Forbidden: User not authenticated' });
            }
            const options = {
                withCredentials: true
            };
            //fetch role with the id from the request from .NET MDU module
            axios_1.default.get('http://localhost:5095/api/Roles/' + req.user.roleId, options)
                .then((response) => {
                if (roles.includes(response.data.name)) {
                    next();
                }
                else {
                    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                }
            })
                .catch((error) => {
                console.error('Get error:', error.message);
                next(new Error("Error getting roles from MDU"));
            });
        }
        catch (error) {
            Logger.error('🔥 Error authorizing roles: %o', error);
            return next(error);
        }
    };
};
exports.default = authorizeRole;
//# sourceMappingURL=authorizeRole.js.map