"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoteDocumentMapper {
    static toDTO(doc) {
        return {
            id: doc.id,
            name: doc.name,
            note_id: doc.note_id,
            url: doc.url,
            object_key: doc.object_key,
            description: doc.description,
            created_on: doc.meta.created_on
        };
    }
}
exports.default = NoteDocumentMapper;
