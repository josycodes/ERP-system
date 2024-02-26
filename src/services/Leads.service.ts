import {Lead} from "../db/entities/Lead.entity";
import {ClientDataSource} from "../db/datasource.config";
import {LeadCreateData} from "../interfaces/leads.interface";

import 'dotenv/config';

export default class LeadsService {
    constructor() {};

    /**
     * Create a new lead
     * @param data
     */
    async createLead(data: LeadCreateData): Promise<Lead> {

        const lead_code = await this.generateLeadCode();
        const lead = new Lead();
        lead.lead_code = lead_code;
        lead.customer_id = data.customer_id;
        lead.category_id = data.category_id;
        lead.message = data.message;

        return await ClientDataSource.getRepository(Lead).save(lead);
    }

    /**
     * Generate a unique lead code
     */
    async generateLeadCode(): Promise<string> {

        // Get the prefix from the environment variable LEAD_CODE
        const prefix = process.env.LEADS_CODE || '';
        const latestLead = await ClientDataSource.getRepository(Lead).findOne({
            order: { id: 'DESC' }
        });

        let leadNumber: number | null = null; // Initialize leadNumber as null

        if (latestLead && latestLead.lead_code.startsWith(prefix)) {
            // Extract the number part by removing the prefix and parsing it as a number
            leadNumber = parseInt(latestLead.lead_code.slice(prefix.length));
        }

        // Increment the lead number by 1 or default to 1 if no latest lead
        leadNumber = leadNumber ? leadNumber + 1 : 1;

        let leadCode: string; // Initialize leadCode as a string
        // Conditionally add leading zeros based on the length of the lead number
        if (leadNumber < 10) {
            // If the length of the number is 1, add 2 leading zeros
            leadCode = prefix + '00' + leadNumber;
        } else if (leadNumber < 100) {
            // If the length of the number is 2, add 1 leading zero
            leadCode = prefix + '0' + leadNumber;
        } else {
            // If the length of the number is more than 2, don't add any leading zeros
            leadCode = prefix + leadNumber;
        }

        return leadCode;
    }

    /**
     * Get all leads
     */
    async allLeads() {
        return await ClientDataSource.getRepository(Lead).find();
    }

    async findLeadById(id: number): Promise<Lead | null> {
        return await ClientDataSource.getRepository(Lead).findOne({ where: { id: id } });
    }

    async updateLead(lead: Lead, newLeadData: Partial<Lead>): Promise<Lead | null> {
        // Update the lead's properties with the new data
        Object.assign(lead, newLeadData);

        // Save the updated lead to the database
        return await ClientDataSource.getRepository(Lead).save(lead);
    }
}

