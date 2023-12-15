"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const axios_1 = __importDefault(require("axios"));
/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    const Logger = typedi_1.Container.get('logger');
    try {
        if (!req.token || req.token == undefined)
            next(new Error("Token inexistente ou inválido "));
        const options = {
            withCredentials: true
        };
        axios_1.default.post('http://localhost:5095/api/Auth/auth/', req.token, options)
            .then((response) => {
            if (response.data != null) {
                req.user = response.data;
                next();
            }
            else {
                next(new Error("fuck off"));
            }
        })
            .catch((error) => {
            console.error('Post error:', error.message);
            next(new Error("Token não corresponde a qualquer utilizador do sistema"));
        });
    }
    catch (e) {
        Logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }
};
exports.default = attachCurrentUser;
//# sourceMappingURL=attachCurrentUser.js.map