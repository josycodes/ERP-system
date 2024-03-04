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
exports.authorizeRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_Lib_1 = __importStar(require("../libs/Error.Lib"));
const Auth_Service_1 = __importDefault(require("../services/Auth.Service"));
const authorizeRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[0].toLowerCase()) !== 'bearer')
            throw new Error_Lib_1.default('unauthorized', 401);
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            throw new Error_Lib_1.default('unauthorized', 401);
        const { i: id, scope } = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        if ((scope === null || scope === void 0 ? void 0 : scope.length) && !scope.includes(req.originalUrl) && !scope.includes(req.path)) {
            throw new Error_Lib_1.default('forbidden', 403);
        }
        const auth = new Auth_Service_1.default();
        const user = yield auth.findUserById(id);
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError || error instanceof Error_Lib_1.NotFound) {
            next(new Error_Lib_1.default('unauthorized', 401));
        }
        else {
            next(error);
        }
    }
});
exports.authorizeRequest = authorizeRequest;
