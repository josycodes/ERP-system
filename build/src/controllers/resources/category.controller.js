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
exports.allCategories = void 0;
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const LeadCategory_Mapper_1 = __importDefault(require("../../mappers/LeadCategory.Mapper"));
const Utils_Service_1 = __importDefault(require("../../services/Utils.Service"));
/**
 * Get all categories
 * @param req
 * @param res
 * @param next
 */
const allCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Utils_Service_1.default.getCategories();
        return new Response_Lib_1.default(req, res)
            .json({
            message: 'Leads Loaded Successfully',
            data: category.map((c) => LeadCategory_Mapper_1.default.toDTO(c))
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allCategories = allCategories;
