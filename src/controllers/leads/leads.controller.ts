import express from 'express';
import {
  ILeadsCreateRequest,
} from '../../interfaces/requests/leads.request.interface';
import ResponseLib from '../../libs/Response.Lib';
import LeadMapper from '../../mappers/Lead.Mapper';
import LeadService from '../../services/Leads.service';
import CustomerService from '../../services/Customer.service';

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
