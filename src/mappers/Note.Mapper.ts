import { Note } from "../db/entities/Note.entity";
import NoteDocumentMapper from "./NoteDocumentMapper.Mapper";
import NoteTagMapper from "./NoteTagMapper.Mapper";

export default class NoteMapper {
    public static toDTO(note: any) {
        const documents =  note?.documents;
        const tags =  note?.tags;
        return {
          id: note.id,
          lead_id: note.lead_id,
          title: note.title,
          content: note.content,
          status: note.status,
          owner: {
            id: note?.owner?.id,
            email: note?.owner?.email,
            first_name: note?.owner?.first_name,
            last_name: note?.owner?.last_name,
            profile_picture: {
              url: note?.owner?.profile_picture?.url,
              name: note?.owner?.profile_picture?.name
            }
          },
          documents: documents ? documents.map((d : any) => NoteDocumentMapper.toDTO(d)) : [],
          tags: tags ? tags.map((t: any) => NoteTagMapper.toDTO(t)) : [],
          created_on: note.meta.created_on,
          modified_on: note.meta.modified_on
        }
    }
}
