
import { NoteTag } from "../db/entities/NoteTag.entity";

export default class NoteTagMapper {
    public static toDTO(tag: NoteTag) {
        return {
            id: tag.id,
            user_id: tag.user_id,
            user: tag.user? {
                name: tag.user?.name,
                picture: tag.user?.profile_picture?.url,
            } : null,
            created_on: tag.meta.created_on
        }
    }
}
