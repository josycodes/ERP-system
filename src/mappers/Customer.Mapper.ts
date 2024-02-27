import { Customer } from "../db/entities/Customer.entity";

export default class CustomerMapper {
    public static toDTO(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            preferred_contact_method: customer.preferred_contact_method,
            created_on: customer.meta?.created_on
        }
    }
}