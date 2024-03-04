"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const index_1 = __importDefault(require("./leads/index"));
const status_1 = __importDefault(require("./resources/status"));
const routes = (0, express_1.Router)();
routes.use('/auth', auth_1.default);
routes.use('/leads', index_1.default);
routes.use('/status', status_1.default);
exports.default = routes;
