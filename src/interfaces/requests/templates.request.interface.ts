export interface ITemplateCreateRequest {
    title: string,
    subject: string,
    content: string,
    category_id: number,
    share_with: [],
    tags?: [] | null,
}

