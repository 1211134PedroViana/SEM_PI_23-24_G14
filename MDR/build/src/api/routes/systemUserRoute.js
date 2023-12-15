"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/user', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.systemUser.name);
    //API POST request - create a new SystemUser
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string(),
            role: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.createSystemUser(req, res, next));
};
//# sourceMappingURL=systemUserRoute.js.map