"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeadCategoryMapper {
    static toDTO(category) {
        return {
            id: category.id,
            name: category.name,
        };
    }
}
exports.default = LeadCategoryMapper;
