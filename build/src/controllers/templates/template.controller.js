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
exports.tagSearch = exports.update = exports.getOne = exports.list = exports.create = void 0;
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const Utils_Service_1 = __importDefault(require("../../services/Utils.Service"));
const Tag_Mapper_1 = __importDefault(require("../../mappers/Tag.Mapper"));
const Template_service_1 = __importDefault(require("../../services/Template.service"));
const Template_Mapper_1 = __importDefault(require("../../mappers/Template.Mapper"));
const TemplateTag_Mapper_1 = __importDefault(require("../../mappers/TemplateTag.Mapper"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = req.user;
        const data = yield new Template_service_1.default().createTemplate(body, user.id);
        return new Response_Lib_1.default(req, res).status(201).json({
            status: true,
            message: "Template created successfully.",
            data: Object.assign(Object.assign({}, Template_Mapper_1.default.toDTO(data.template)), { tags: (data === null || data === void 0 ? void 0 : data.tags) ? data === null || data === void 0 ? void 0 : data.tags.map(t => TemplateTag_Mapper_1.default.toDTO(t)) : null })
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, from, to, search } = req.query;
        const templateService = new Template_service_1.default();
        const templates = yield templateService.allTemplates(search, Number(page), Number(limit), from, to);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Templates Loaded Successfully',
            data: templates.items.map(note => Template_Mapper_1.default.toDTO(note)),
            meta: Utils_Service_1.default.paginate(req.query, templates)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.list = list;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { template_id } = req.params;
        const user = req.user;
        const templateService = new Template_service_1.default();
        const template = yield templateService.getOne(Number(template_id), user.id);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Template Loaded Successfully',
            data: Template_Mapper_1.default.toDTO(template),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { template_id } = req.params;
        const user = req.user;
        const data = req.body;
        const templateService = new Template_service_1.default();
        const note = yield templateService.updateTemplate(Number(template_id), user.id, data);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Template updated Successfully',
            data: Template_Mapper_1.default.toDTO(note),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const tagSearch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const templateService = new Template_service_1.default();
        const tags = yield templateService.tagSearch(String(query));
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Tags searched Successfully',
            data: tags === null || tags === void 0 ? void 0 : tags.map((t) => Tag_Mapper_1.default.toDTO(t)),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.tagSearch = tagSearch;
