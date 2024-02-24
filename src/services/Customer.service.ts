import { Customer } from "../db/entities/Customer.entity";
import { ClientDataSource } from "../db/datasource.config";
import 'dotenv/config';
import { CustomerCreateData } from "../interfaces/customer.interface";
import DBAdapter from "../adapters/DBAdapter";

export default class CustomerService {
  constructor() { };

  /**
   * Create a new Customer
   * @param data
   */
  async createCustomer(data: CustomerCreateData): Promise<Customer> {
    const {
      name, phone, email, address, preferred_contact_method
    } = data;

    const customer = await new DBAdapter().insertAndFetch(Customer, {
      name,
      address,
      phone,
      email,
      preferred_contact_method
    });
    return customer;
  }

  /**
   * Get a customer by email
   * @param email
   */
  async getCustomerByEmail(email: string): Promise<Customer | null> {
    return await new DBAdapter().findOne(Customer, { where: { email: email } });
  }

  /**
   * Get a customer by ID
   * @param id
   */
  async getCustomerByID(id: number): Promise<Customer | null> {
    return await new DBAdapter().findOne(Customer, { where: { id } });
  }
}

