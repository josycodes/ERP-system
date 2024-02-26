import express from 'express';
import {
    ILeadsCreateRequest
} from '../../interfaces/requests/leads.request.interface';

import ResponseLib from '../../libs/Response.Lib';
import LeadMapper from '../../mappers/Lead.Mapper';
import LeadService from '../../services/Leads.service';
import CustomerService from '../../services/Customer.service';
import StatusService from "../../services/Status.service";

export const createLead = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const body: ILeadsCreateRequest = req.body;
    const leadService = new LeadService();
    const customerService = new CustomerService();

    try {
        // Check if the customer exists, then create a new customer if necessary
        let customerId;
        const existingCustomer = await customerService.getCustomerByEmail(body.email);
        if (!existingCustomer) {
            // Create a new customer
            const newCustomer = await customerService.createCustomer({
                name: body.name,
                email: body.email,
                phone: body.phone,
                address: body.address,
                preferred_contact_method: body.preferred_contact_method
            });
            customerId = newCustomer.id;
        } else {
            customerId = existingCustomer.id;
        }

        // Create the lead
        const lead = await leadService.createLead({
            customer_id: customerId,
            category_id: body.leads_category,
            message: body.message
    });

        return new ResponseLib(req, res)
            .json({
                message: 'Lead Created Successfully',
                data: LeadMapper.toDTO(lead)
            });
    } catch (error) {
        next(error)
    }
}

/**
 * Get all leads
 * @param req
 * @param res
 * @param next
 */
export const allLeads = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const leadService = new LeadService();

    try {
        // Get all Leads
        const leads = await leadService.allLeads();
        const leadsDTO = await Promise.all(leads.map(async (lead) => {
            return await LeadMapper.toDTO(lead);
        }));

        return new ResponseLib(req, res)
            .json({
                message: 'Leads Loaded Successfully',
                data: leadsDTO
            });
    } catch (error) {
        next(error)
    }
}

export const getLead = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { lead_id } = req.params;
    const leadService = new LeadService();
    try {
        // Get Lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) {
            return new ResponseLib(req, res)
                .json({
                    message: 'Lead Not Found'
                });
        }
        return new ResponseLib(req, res)
            .json({
                message: 'Lead Loaded Successfully',
                data: LeadMapper.toDTO(lead)
            });
    } catch (error) {
        next(error)
    }
}

export const updateLead = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { lead_id } = req.params;
    const { lead_value } = req.body;
    const leadService = new LeadService();
    try {
        // Get Lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) {
            return new ResponseLib(req, res)
                .json({
                    message: 'Lead Not Found'
                });
        }

        //update lead
        const newLeadData = {
            lead_value: lead_value
        }
        const updatedLead = await leadService.updateLead(lead, newLeadData);

        if (!updatedLead) {
            return new ResponseLib(req, res)
                .json({
                    message: 'Lead Not Updated'
                });
        }

        return new ResponseLib(req, res)
            .json({
                message: 'Lead Loaded Successfully',
                data: LeadMapper.toDTO(updatedLead)
            });
    } catch (error) {
        next(error)
    }
}

export const updateLeadStatus = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { lead_id } = req.params;
    const { status } = req.body;
    const leadService = new LeadService();
    const statusService = new StatusService();
    try {

        const allStatuses = await statusService.allStatuses();
        const allowedStatuses = allStatuses.map(status => status.slug);

        // Check if the provided status exists in the list of allowed statuses
        if (!allowedStatuses.includes(status)) {
            return new ResponseLib(req, res).status(400).json({ error: 'Invalid status provided' });
        }

        // Get Lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) {
            return new ResponseLib(req, res)
                .json({
                    message: 'Lead Not Found'
                });
        }

        //update lead
        const newLeadData = { status: status }
        const updatedLead = await leadService.updateLead(lead, newLeadData);

        if (!updatedLead) {
            return new ResponseLib(req, res)
                .json({
                    message: 'Lead Not Updated'
                });
        }

        return new ResponseLib(req, res)
            .json({
                message: 'Lead Loaded Successfully',
                data: LeadMapper.toDTO(updatedLead)
            });
    } catch (error) {
        next(error)
    }
}