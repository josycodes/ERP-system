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
const DBAdapter_1 = __importDefault(require("../adapters/DBAdapter"));
const Category_entity_1 = require("../db/entities/Category.entity");
class UtilsService {
    static paginate(query, result) {
        return {
            limit: query.limit, total: result.total, page: query.page,
            pages: Math.ceil(Number(result.total) / Number(query.limit))
        };
    }
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().find(Category_entity_1.Category, { where: { meta: { deleted_flag: false } } });
        });
    }
}
exports.default = UtilsService;
