"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerMapper {
    static toDTO(customer) {
        var _a;
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            preferred_contact_method: customer.preferred_contact_method,
            created_on: (_a = customer.meta) === null || _a === void 0 ? void 0 : _a.created_on
        };
    }
}
exports.default = CustomerMapper;
