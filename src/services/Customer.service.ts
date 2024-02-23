import {Customer} from "../db/entities/Customer.entity";
import {ClientDataSource} from "../db/datasource.config";
import 'dotenv/config';
import {CustomerCreateData} from "../interfaces/customer.interface";

export default class CustomerService {
    constructor() {};

    /**
     * Create a new Customer
     * @param data
     */
    async createCustomer(data: CustomerCreateData): Promise<Customer> {

        const customer = new Customer();
        customer.name = data.name;
        customer.email = data.email;
        customer.phone = data.phone;
        customer.address = data.address;
        customer.preferred_contact_method = data.preferred_contact_method;

        return await ClientDataSource.getRepository(Customer).save(customer);

    }

    /**
     * Get a customer by email
     * @param email
     */
    async getCustomerByEmail(email: string): Promise<Customer | null> {
        return await ClientDataSource.getRepository(Customer).findOne({where: {email: email}});
    }

    /**
     * Get a customer by ID
     * @param id
     */
    async getCustomerByID(id: number): Promise<Customer | null> {
        return await ClientDataSource.getRepository(Customer).findOne({where: {id: id}});
    }
}

