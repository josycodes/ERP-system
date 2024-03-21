"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../middlewares/authorization");
const category_controller_1 = require("../../controllers/resources/category.controller");
const routes = (0, express_1.Router)();
routes.use(authorization_1.authorizeRequest);
routes.get('/list', category_controller_1.allCategories);
exports.default = routes;
