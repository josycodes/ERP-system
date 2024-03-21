"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaMapper {
    static toDTO(media) {
        var _a, _b;
        return {
            id: media.id,
            name: media.name,
            description: media.description ? null : media.description,
            object_key: media.object_key ? null : media.object_key,
            url: media.url,
            user: media.user ? {
                id: media.user.id,
                email: media.user.email,
                name: media.user.name,
                status: media.user.status,
                picture: media.user.profile_picture
                    ? {
                        id: media.user.profile_picture.id,
                        name: media.user.profile_picture.name,
                        description: media.user.profile_picture.description,
                        url: media.user.profile_picture.url,
                    }
                    : null,
                created_on: (_a = media.user.meta) === null || _a === void 0 ? void 0 : _a.created_on
            } : null,
            created_on: (_b = media.meta) === null || _b === void 0 ? void 0 : _b.created_on
        };
    }
}
exports.default = MediaMapper;
