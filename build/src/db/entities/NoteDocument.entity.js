"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteDocuments = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
const Note_entity_1 = require("./Note.entity");
let NoteDocuments = class NoteDocuments {
};
exports.NoteDocuments = NoteDocuments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], NoteDocuments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], NoteDocuments.prototype, "note_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', nullable: false })
], NoteDocuments.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', nullable: true })
], NoteDocuments.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'object_key', type: 'varchar', nullable: false })
], NoteDocuments.prototype, "object_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url', type: 'varchar', nullable: true })
], NoteDocuments.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'note_id' }),
    (0, typeorm_1.ManyToOne)(() => Note_entity_1.Note, (note) => note)
], NoteDocuments.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], NoteDocuments.prototype, "meta", void 0);
exports.NoteDocuments = NoteDocuments = __decorate([
    (0, typeorm_1.Entity)('note_documents')
], NoteDocuments);
