"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const getToken = req => {
    const authHeader = req.headers.authorization;
    // check if the JWT is in the Authorization header
    if (authHeader && (authHeader.split(' ')[0] === 'Token' && authHeader.split(' ')[0] === 'Bearer')) {
        return authHeader.split(' ')[1];
    }
    // check if the JWT is in a cookie
    if (req.cookies[config_1.default.cookieName] != undefined && req.cookies[config_1.default.cookieName] != null) {
        return req.cookies[config_1.default.cookieName];
    }
    return null;
};
const isAuth = (req, res, next) => {
    try {
        // get the token from the request
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }
        // attach the token to the request
        req.token = token;
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map