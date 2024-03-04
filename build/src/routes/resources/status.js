"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../middlewares/authorization");
const status_controller_1 = require("../../controllers/resources/status.controller");
const routes = (0, express_1.Router)();
routes.use(authorization_1.authorizeRequest);
routes.get('/list', status_controller_1.allStatuses);
exports.default = routes;
