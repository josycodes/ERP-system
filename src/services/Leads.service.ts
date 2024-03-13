import { Lead } from "../db/entities/Lead.entity";
import { ClientDataSource } from "../db/datasource.config";
import { LeadCreateData } from "../interfaces/leads.interface";
import { PaginatedTotal } from '../interfaces/responses/pagination.response.interface';


import 'dotenv/config';
import DBAdapter from "../adapters/DBAdapter";
import { IRequestQuery } from "../interfaces/requests/request.interface";
import { Between, ILike, IsNull, Not } from "typeorm";
import moment from "moment";
import { LeadAssignment } from "../db/entities/LeadAssignment.entity";

export default class LeadsService {
  constructor() { };

  /**
   * Create a new lead
   * @param data
   */
  async createLead(data: LeadCreateData): Promise<Lead> {
    const { customer_id, category_id, message } = data;

    const lead_code =  await this.generateLeadCode();
    const lead = await new DBAdapter().insertAndFetch(Lead, {
        lead_code,
        customer_id,
        category_id,
        message,
    })
    return lead;
  }

  /**
   * Generate a unique lead code
   */
  async generateLeadCode(): Promise<string> {
      // Get the prefix from the environment variable LEAD_CODE
      const prefix = process.env.LEADS_CODE || '';
      const latestLead = await new DBAdapter().find(Lead, {
          order: {id: 'DESC'}
      });

      let leadNumber: number | null = null; // Initialize leadNumber as null
      if (latestLead && latestLead[0]?.lead_code?.startsWith(prefix)) {
          // Extract the number part by removing the prefix and parsing it as a number
          leadNumber = parseInt(latestLead[0].lead_code.slice(prefix.length));
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
    async allLeads(
        customer_id: number,
        search: string,
        page: number,
        limit: number,
        status?: Lead['status'],
        from?: string, to?: string
    ):  Promise<PaginatedTotal<Lead>> {
        const skip = (page - 1) * limit;
        const [leads, total] =  await new DBAdapter().findAndCount(Lead, {
            where: {
                lead_code: !search ? Not(IsNull()) : ILike("%" + search + "%"),
                customer_id: !customer_id ? Not(IsNull()): customer_id,
                status: !status ? Not(IsNull()) : status, 
                meta: {
                  deleted_flag: false,
                  created_on: from && to ? Between(moment(from).toDate(), moment(to).add(1, 'days').toDate()) : undefined
                }},
            skip,
            take: limit,
            relations: { customer: true, category: true },
            order: { id: 'DESC' }
        })
        return {items: leads, total};
    }

    async findLeadById(id: number): Promise<Lead | null> {
        return await new DBAdapter().findOne(Lead, { 
            where: { id: id },
            relations: { customer: true, category: true },
        });
    }

    async findLeadAssignment(id: number): Promise<LeadAssignment | null> {
        return await new DBAdapter().findOne(LeadAssignment, { 
            where: { lead_id: id },
            relations: { user: true },
        });
    }

    async updateLead(id: number, newLeadData: Partial<Lead>): Promise<Lead | null> {
        const { lead_value, status, lead_source } = newLeadData;
        // Save the updated lead to the database
        return await new DBAdapter().updateAndFetch(Lead, { id }, {
            lead_value,
            status,
            lead_source
        })
    }
}
