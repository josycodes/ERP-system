"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = void 0;
const Error_Lib_1 = __importStar(require("../libs/Error.Lib"));
const Response_Lib_1 = __importDefault(require("../libs/Response.Lib"));
const User_Mapper_1 = __importDefault(require("../mappers/User.Mapper"));
const Auth_Service_1 = __importDefault(require("../services/Auth.Service"));
const config_1 = require("../config");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const auth = new Auth_Service_1.default();
        const user = yield auth.findUserByEmail(body.email);
        yield auth.validateUserPassword(body.password, user.password);
        if (user.status !== config_1.STATUSES.ACTIVE) {
            throw new Error_Lib_1.default(`Cannot login, account is ${user.status}.`, 400);
        }
        const token = yield auth.generateUserToken(user);
        return new Response_Lib_1.default(req, res)
            .setHeader({ 'access-token': token }).json({
            message: 'Successfully logged in',
            data: {
                user: User_Mapper_1.default.toDTO(user),
                token
            }
        });
    }
    catch (error) {
        if (error instanceof Error_Lib_1.NotFound || error instanceof Error_Lib_1.BadRequest) {
            return next(new Error_Lib_1.BadRequest('Incorrect username or password'));
        }
        next(error);
    }
});
exports.login = login;
