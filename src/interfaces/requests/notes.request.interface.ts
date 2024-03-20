import { NOTE_STATUS } from "../../config";

export interface INotesCreateRequest {
    title: string,
    content: string,
    status: NOTE_STATUS,
    documents?: INoteDocumentsRequest[] | null,
    tags?: [] | null,
}

export interface INoteDocumentsRequest {
    name: string,
    url: string,
    description?: string,
    object_key?: string,
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
