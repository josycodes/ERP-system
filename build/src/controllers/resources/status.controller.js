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
exports.allStatuses = void 0;
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const Status_service_1 = __importDefault(require("../../services/Status.service"));
const Status_Mapper_1 = __importDefault(require("../../mappers/Status.Mapper"));
/**
 * Get all leads
 * @param req
 * @param res
 * @param next
 */
const allStatuses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusService = new Status_service_1.default();
    try {
        // Get all Statuses
        const statuses = yield statusService.allStatuses();
        const statusDTO = yield Promise.all(statuses.map((status) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Status_Mapper_1.default.toDTO(status);
        })));
        return new Response_Lib_1.default(req, res)
            .json({
            message: 'Leads Loaded Successfully',
            data: statusDTO
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allStatuses = allStatuses;
