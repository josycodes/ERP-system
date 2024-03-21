"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateTag_Mapper_1 = __importDefault(require("./TemplateTag.Mapper"));
class TemplateMapper {
    static toDTO(template) {
        var _a, _b, _c;
        const tags = template === null || template === void 0 ? void 0 : template.tags;
        return {
            id: template.id,
            title: template.title,
            subject: template.subject,
            content: template.content,
            status: template.status,
            owner: {
                id: (_a = template === null || template === void 0 ? void 0 : template.owner) === null || _a === void 0 ? void 0 : _a.id,
                email: template.owner.email,
                first_name: template.owner.first_name,
                last_name: template.owner.last_name,
                profile_picture: {
                    url: (_b = template.owner.profile_picture) === null || _b === void 0 ? void 0 : _b.url,
                    name: (_c = template.owner.profile_picture) === null || _c === void 0 ? void 0 : _c.name
                }
            },
            tags: tags ? tags.map((t) => TemplateTag_Mapper_1.default.toDTO(t)) : [],
            created_on: template.meta.created_on,
            modified_on: template.meta.modified_on
        };
    }
}
exports.default = TemplateMapper;
