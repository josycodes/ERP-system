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
const typeorm_1 = require("typeorm");
const DBAdapter_1 = __importDefault(require("../adapters/DBAdapter"));
const Note_entity_1 = require("../db/entities/Note.entity");
const NoteDocument_entity_1 = require("../db/entities/NoteDocument.entity");
const NoteTag_entity_1 = require("../db/entities/NoteTag.entity");
const moment_1 = __importDefault(require("moment"));
const Error_Lib_1 = require("../libs/Error.Lib");
const User_entity_1 = require("../db/entities/User.entity");
const Customer_entity_1 = require("../db/entities/Customer.entity");
class NoteService {
    constructor(lead) {
        this.lead = lead;
    }
    createNote(data, owner_id, lead_id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield new DBAdapter_1.default().insertAndFetch(Note_entity_1.Note, {
                lead_id,
                title: data.title,
                content: data.content,
                owner_id,
                status: data.status,
            });
            let docs;
            let tags;
            if ((_a = data === null || data === void 0 ? void 0 : data.documents) === null || _a === void 0 ? void 0 : _a.length) {
                docs = yield Promise.all(data.documents.map((doc) => __awaiter(this, void 0, void 0, function* () { return yield this.storeNoteDocs(note.id, doc); })));
            }
            if ((_b = data === null || data === void 0 ? void 0 : data.tags) === null || _b === void 0 ? void 0 : _b.length) {
                tags = yield Promise.all(data.tags.map((tag) => __awaiter(this, void 0, void 0, function* () { return yield this.storeNoteTags(note.id, Number(tag)); })));
            }
            return {
                note,
                documents: docs,
                tags
            };
        });
    }
    storeNoteDocs(note_id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, url, object_key } = document;
            return yield new DBAdapter_1.default().insertAndFetch(NoteDocument_entity_1.NoteDocuments, {
                name,
                description,
                object_key,
                url,
                note_id
            });
        });
    }
    storeNoteTags(note_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().insertAndFetch(NoteTag_entity_1.NoteTag, {
                note_id,
                user_id
            });
        });
    }
    allNotes(lead_id, search, page, limit, status, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            // TODO: use raw query here???
            const query = {
                lead_id,
                status: !status ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : status,
                meta: {
                    deleted_flag: false,
                    created_on: from && to ? (0, typeorm_1.Between)((0, moment_1.default)(from).toDate(), (0, moment_1.default)(to).add(1, 'days').toDate()) : undefined
                }
            };
            const [notes, total] = yield new DBAdapter_1.default().findAndCount(Note_entity_1.Note, {
                where: [
                    Object.assign({ title: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%") }, query),
                    Object.assign({ content: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%") }, query)
                ],
                skip,
                take: limit,
                relations: {
                    // lead: true,
                    owner: true,
                    // tags: true,
                    // documents: true,
                },
                order: { id: 'DESC' }
            });
            return { items: notes, total };
        });
    }
    getOne(lead_id, note_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield new DBAdapter_1.default().findOne(Note_entity_1.Note, {
                where: { id: note_id, lead_id, owner_id: user_id, meta: { deleted_flag: false } },
                relations: { owner: true }
            });
            if (!note)
                throw new Error_Lib_1.BadRequest('Note not found.');
            const query = {
                where: { note_id, meta: { deleted_flag: false },
                }
            };
            const tags = yield new DBAdapter_1.default().find(NoteTag_entity_1.NoteTag, Object.assign(Object.assign({}, query), { relations: { user: true } }));
            const documents = yield new DBAdapter_1.default().find(NoteDocument_entity_1.NoteDocuments, query);
            return Object.assign(Object.assign({}, note), { tags, documents });
        });
    }
    updateNote(lead_id, note_id, user_id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new DBAdapter_1.default();
            const note = yield db.findOne(Note_entity_1.Note, {
                where: { id: note_id, lead_id, owner_id: user_id }
            });
            if (!note)
                throw new Error_Lib_1.BadRequest('Note not found.');
            const { title, content, tags, documents, status } = updates;
            let newTags, newDocs;
            if (tags) {
                yield db.update(NoteTag_entity_1.NoteTag, { note_id }, { meta: { deleted_flag: true } });
                const newTag = tags.map((user_id) => {
                    return { user_id, note_id };
                });
                newTags = yield db.insertAndFetch(NoteTag_entity_1.NoteTag, newTag, { user: true });
            }
            else {
                newTags = yield db.find(NoteTag_entity_1.NoteTag, { where: { note_id, meta: { deleted_flag: false } }, relations: { user: true } });
            }
            if (documents) {
                yield db.update(NoteDocument_entity_1.NoteDocuments, { note_id }, { meta: { deleted_flag: true } });
                const newDoc = documents.map((t) => {
                    return {
                        name: t.name,
                        description: t.description,
                        object_key: t.object_key,
                        url: t.url,
                        note_id
                    };
                });
                newDocs = yield db.insertAndFetch(NoteDocument_entity_1.NoteDocuments, newDoc, { owner: true });
            }
            else {
                newDocs = yield db.find(NoteDocument_entity_1.NoteDocuments, { where: { note_id, meta: { deleted_flag: false } } });
            }
            const newNote = yield db.updateAndFetch(Note_entity_1.Note, { id: note_id, lead_id, owner_id: user_id }, {
                title,
                content,
                status
            }, {}, { owner: true });
            return Object.assign(Object.assign({}, newNote), { tags: newTags, documents: newDocs });
        });
    }
    tagSearch(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = {
                where: {
                    name: !query ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + query + "%"),
                }
            };
            const users = yield new DBAdapter_1.default().find(User_entity_1.User, queryString);
            const customers = yield new DBAdapter_1.default().find(Customer_entity_1.Customer, queryString);
            return [
                ...users,
                ...customers
            ];
        });
    }
}
exports.default = NoteService;
