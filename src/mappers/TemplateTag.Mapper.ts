import { TemplateTag } from "../db/entities/TemplateTag.entity";

export default class TemplateTagMapper {
    public static toDTO(tag: TemplateTag) {
        return {
            id: tag.id,
            entity_data: tag.entity_data? tag.entity_data: null,
            created_on: tag.meta.created_on
        }
    }
}
