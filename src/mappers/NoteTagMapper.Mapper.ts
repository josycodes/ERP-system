import { NoteTag } from "../db/entities/NoteTag.entity";

export default class NoteTagMapper {
    public static toDTO(tag: NoteTag) {
        return {
            id: tag.id,
            tag_id: tag.tag_id,
            entity_data: tag.entity_data? tag.entity_data: null,
            created_on: tag.meta.created_on
        }
    }
}
