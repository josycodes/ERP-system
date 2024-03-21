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
const Leads_service_1 = __importDefault(require("../../services/Leads.service"));
const Error_Lib_1 = require("../../libs/Error.Lib");
const Notes_Service_1 = __importDefault(require("../../services/Notes.Service"));
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const Note_Mapper_1 = __importDefault(require("../../mappers/Note.Mapper"));
const NoteDocumentMapper_Mapper_1 = __importDefault(require("../../mappers/NoteDocumentMapper.Mapper"));
const NoteTagMapper_Mapper_1 = __importDefault(require("../../mappers/NoteTagMapper.Mapper"));
const Utils_Service_1 = __importDefault(require("../../services/Utils.Service"));
const Tag_Mapper_1 = __importDefault(require("../../mappers/Tag.Mapper"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = req.params;
        const user = req.user;
        const lead = yield new Leads_service_1.default().findLeadById(Number(id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead not found.');
        const data = yield new Notes_Service_1.default(lead).createNote(body, user.id, lead.id);
        return new Response_Lib_1.default(req, res).status(201).json({
            status: true,
            message: "Note created successfully.",
            data: Object.assign(Object.assign({}, Note_Mapper_1.default.toDTO(data.note)), { documents: data.documents ? data.documents.map(d => NoteDocumentMapper_Mapper_1.default.toDTO(d)) : null, tags: (data === null || data === void 0 ? void 0 : data.tags) ? data === null || data === void 0 ? void 0 : data.tags.map(t => NoteTagMapper_Mapper_1.default.toDTO(t)) : null })
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { page, limit, status, from, to, search } = req.query;
        const noteService = new Notes_Service_1.default();
        const notes = yield noteService.allNotes(Number(id), search, Number(page), Number(limit), status, from, to);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Notes Loaded Successfully',
            data: notes.items.map(note => Note_Mapper_1.default.toDTO(note)),
            meta: Utils_Service_1.default.paginate(req.query, notes)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.list = list;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: note_id, lead_id } = req.params;
        const user = req.user;
        const noteService = new Notes_Service_1.default();
        const note = yield noteService.getOne(Number(lead_id), Number(note_id), user.id);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Note Loaded Successfully',
            data: Note_Mapper_1.default.toDTO(note),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: note_id, lead_id } = req.params;
        const user = req.user;
        const data = req.body;
        const noteService = new Notes_Service_1.default();
        const note = yield noteService.updateNote(Number(lead_id), Number(note_id), user.id, data);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Note updated Successfully',
            data: Note_Mapper_1.default.toDTO(note),
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
        const noteService = new Notes_Service_1.default();
        const tags = yield noteService.tagSearch(String(query));
        // console.log('-----?', tags)
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
