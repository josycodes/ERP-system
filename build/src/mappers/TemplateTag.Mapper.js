"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateTagMapper {
    static toDTO(tag) {
        return {
            id: tag.id,
            entity_data: tag.entity_data ? tag.entity_data : null,
            created_on: tag.meta.created_on
        };
    }
}
exports.default = TemplateTagMapper;
