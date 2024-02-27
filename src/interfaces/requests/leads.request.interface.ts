export interface ILeadsCreateRequest {
    name: string,
    email: string,
    phone: string,
    address: string,
    leads_category: number,
    message: string,
    preferred_contact_method : 'email' | 'phone' | 'either';
}

export interface ILeadGetRequest {
    lead_id: number,
}

export interface ILeadUpdateRequest {
    lead_value: number,
}

export interface ILeadUpdateStatusRequest {
    status: string,
}
