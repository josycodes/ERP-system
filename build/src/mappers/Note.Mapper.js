"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteDocumentMapper_Mapper_1 = __importDefault(require("./NoteDocumentMapper.Mapper"));
const NoteTagMapper_Mapper_1 = __importDefault(require("./NoteTagMapper.Mapper"));
class NoteMapper {
    static toDTO(note) {
        var _a, _b, _c;
        const documents = note === null || note === void 0 ? void 0 : note.documents;
        const tags = note === null || note === void 0 ? void 0 : note.tags;
        return {
            id: note.id,
            lead_id: note.lead_id,
            title: note.title,
            content: note.content,
            status: note.status,
            owner: {
                id: (_a = note === null || note === void 0 ? void 0 : note.owner) === null || _a === void 0 ? void 0 : _a.id,
                email: note.owner.email,
                first_name: note.owner.first_name,
                last_name: note.owner.last_name,
                profile_picture: {
                    url: (_b = note.owner.profile_picture) === null || _b === void 0 ? void 0 : _b.url,
                    name: (_c = note.owner.profile_picture) === null || _c === void 0 ? void 0 : _c.name
                }
            },
            documents: documents ? documents.map((d) => NoteDocumentMapper_Mapper_1.default.toDTO(d)) : [],
            tags: tags ? tags.map((t) => NoteTagMapper_Mapper_1.default.toDTO(t)) : [],
            created_on: note.meta.created_on,
            modified_on: note.meta.modified_on
        };
    }
}
exports.default = NoteMapper;
