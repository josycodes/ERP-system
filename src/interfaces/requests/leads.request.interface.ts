export interface ILeadsCreateRequest {
    name: string,
    email: string,
    phone: string,
    address: string,
    leads_category: number,
    message: string,
    preferred_contact_method : 'email' | 'phone' | 'either';
}
