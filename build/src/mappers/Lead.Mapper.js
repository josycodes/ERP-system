"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeadMapper {
    static toDTO(lead) {
        var _a;
        return {
            id: lead.id,
            lead_code: lead.lead_code,
            customer: lead.customer ? {
                id: lead.customer.id,
                name: lead.customer.name,
                email: lead.customer.email,
                phone: lead.customer.phone,
                address: lead.customer.address,
                preferred_contact_method: lead.customer.preferred_contact_method
            } : null,
            category: lead.category ? {
                id: lead.category.id,
                name: lead.category.name
            } : null,
            message: lead.message,
            lead_value: lead.lead_value,
            lead_source: lead.lead_source,
            status: lead.status,
            created_on: (_a = lead.meta) === null || _a === void 0 ? void 0 : _a.created_on
        };
    }
}
exports.default = LeadMapper;
