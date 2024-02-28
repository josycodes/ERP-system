import { Lead } from "../db/entities/Lead.entity";

export default class LeadMapper {
    public static toDTO(lead: Lead) {
        return {
            id: lead.id,
            lead_code: lead.lead_code,
            customer:  lead.customer ? {
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
            }: null,
            message: lead.message,
            lead_value: lead.lead_value,
            lead_source: lead.lead_source,
            status: lead.status,
            created_on: lead.meta?.created_on
        }
    }
}