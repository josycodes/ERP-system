import express from 'express';
import ResponseLib from '../../libs/Response.Lib';
import LeadMapper from '../../mappers/Lead.Mapper';
import LeadService from '../../services/Leads.service';
import CustomerService from '../../services/Customer.service';
import StatusService from "../../services/Status.service";
import {ILeadsCreateRequest} from "../../interfaces/requests/leads.request.interface";
import { IRequestQuery } from '../../interfaces/requests/request.interface';
import { Lead } from '../../db/entities/Lead.entity';
import UtilsService from '../../services/Utils.Service';
import { BadRequest } from '../../libs/Error.Lib';
import { LeadAssignment } from '../../db/entities/LeadAssignment.entity';

export const createLead = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body: ILeadsCreateRequest = req.body;
  const leadService = new LeadService();
  const customerService = new CustomerService();
  try {
    // Check if the customer exists, then create a new customer if necessary
    let customer;
    const existingCustomer = await customerService.getCustomerByEmail(body.email);
    if (!existingCustomer) {
      // Create a new customer
      customer = await customerService.createCustomer({
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        preferred_contact_method: body.preferred_contact_method
      });
    } else {
      customer = existingCustomer;
    }

    // Create the lead
    const lead = await leadService.createLead({
        customer_id: customer.id,
        category_id: body.leads_category,
        message: body.message
    });

    return new ResponseLib(req, res)
        .status(201)
        .json({
            status: true,
            message: 'Lead Created Successfully',
            data: LeadMapper.toDTO({...lead, customer })
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
    const { page, limit, status, from, to, customer_id, search }: IRequestQuery = req.query;

    try {
        // Get all Leads
        const leads = await leadService.allLeads(Number(customer_id), search, Number(page), Number(limit), status as Lead['status'], from, to);
        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Leads Loaded Successfully',
                data: leads.items.map(lead => LeadMapper.toDTO(lead)),
                meta: UtilsService.paginate(req.query, leads)
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
        const leadAssignment = await leadService.findLeadAssignment(parseInt(lead_id));
        if (!lead) throw new BadRequest('Lead not found.')
        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Lead Loaded Successfully',
                data: {
                    ...LeadMapper.toDTO(lead),
                    LeadAssignment: {
                        id: leadAssignment?.user.id,
                        name: leadAssignment?.user.name,
                        picture: leadAssignment?.user.profile_picture?.url
                    }
                }
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
        if (!lead) throw new BadRequest('Lead not found.')

        //update lead
        const updatedLead = await leadService.updateLead(Number(lead_id), { lead_value });
        if (!updatedLead) throw new BadRequest('Failed to Update lead.');

        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Lead updated Successfully',
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
        if (!allowedStatuses.includes(status)) throw new BadRequest('Invalid status provided');

        // Get Lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) throw new BadRequest('Lead Not Found');

        //update lead
        const updatedLead = await leadService.updateLead(Number(lead_id), { status });
        if (!updatedLead) throw new BadRequest('Failed to update lead.')

        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Lead Loaded Successfully',
                data: LeadMapper.toDTO(updatedLead)
            });
    } catch (error) {
        next(error)
    }
}

