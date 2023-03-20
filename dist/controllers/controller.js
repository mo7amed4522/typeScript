"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = exports.getData = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const userModel = new user_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.register(req.body);
        res.json({
            success: 0,
            data: Object.assign({}, user),
            message: 'user created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getusers();
        res.json({
            success: 0,
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getData = getData;
const authenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
        if (!user) {
            return res.status(401).json({
                success: 1,
                message: 'the email or password do not match please try again',
            });
        }
        return res.header('Access-Control-Allow-Origin', req.headers.origin).json({
            success: 0,
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authenticated = authenticated;
