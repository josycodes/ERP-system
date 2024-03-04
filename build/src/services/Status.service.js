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
Object.defineProperty(exports, "__esModule", { value: true });
const Status_entity_1 = require("../db/entities/Status.entity");
const datasource_config_1 = require("../db/datasource.config");
require("dotenv/config");
class StatusService {
    constructor() { }
    ;
    /**
     * Get all leads
     */
    allStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield datasource_config_1.ClientDataSource.getRepository(Status_entity_1.Status).find();
        });
    }
}
exports.default = StatusService;
