import { NoteDocuments } from "../db/entities/NoteDocument.entity";

export default class NoteDocumentMapper {
    public static toDTO(doc: NoteDocuments) {
        return {
            id: doc.id,
            name: doc.name,
            note_id: doc.note_id,
            url: doc.url,
            object_key: doc.object_key,
            description: doc.description,
            created_on: doc.meta.created_on
        }
    }
}
