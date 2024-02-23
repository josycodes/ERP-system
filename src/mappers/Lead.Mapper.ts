import { Lead } from "../db/entities/Lead.entity";
import CustomerService from "../services/Customer.service";

export default class LeadMapper {
    public static async toDTO(lead: Lead) {
        const customerService = new CustomerService();
        const customer = await customerService.getCustomerByID(lead.customer_id);

        return {
            id: lead.id,
            lead_code: lead.lead_code,
            customer: customer,
            category_id: lead.category_id,
            message: lead.message,
            lead_value: lead.lead_value,
            lead_source: lead.lead_source,
            status: lead.status,
            created_on: lead.meta?.created_on
        }
    }
}