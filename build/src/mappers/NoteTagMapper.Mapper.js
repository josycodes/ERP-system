"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoteTagMapper {
    static toDTO(tag) {
        var _a, _b, _c;
        return {
            id: tag.id,
            user_id: tag.user_id,
            user: tag.user ? {
                name: (_a = tag.user) === null || _a === void 0 ? void 0 : _a.name,
                picture: (_c = (_b = tag.user) === null || _b === void 0 ? void 0 : _b.profile_picture) === null || _c === void 0 ? void 0 : _c.url,
            } : null,
            entity_data: tag.entity_data ? tag.entity_data : null,
            created_on: tag.meta.created_on
        };
    }
}
exports.default = NoteTagMapper;
