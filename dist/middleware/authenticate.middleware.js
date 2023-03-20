"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const handleauthenticateerror = (next) => {
    const error = new Error('login Error: please try again');
    error.status = 401;
    next(error);
};
const vaildTokenMiddleware = (req, res, next) => {
    try {
        //get auth header
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (bearer && token == 'bearer token') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.token);
                if (decode) {
                    next();
                }
                else {
                    handleauthenticateerror(next);
                }
            }
            else {
                handleauthenticateerror(next);
            }
        }
        else {
            handleauthenticateerror(next);
        }
    }
    catch (error) {
        handleauthenticateerror(next);
    }
};
exports.default = vaildTokenMiddleware;
