import TemplateTagMapper from "./TemplateTag.Mapper";

export default class TemplateMapper {
    public static toDTO(template: any) {
        const tags =  template?.tags;
        return {
            id: template.id,
            title: template.title,
            subject: template.subject,
            content: template.content,
            status: template.status,
            owner: {
                id: template?.owner?.id,
                email: template.owner.email,
                first_name: template.owner.first_name,
                last_name: template.owner.last_name,
                profile_picture: {
                    url: template.owner.profile_picture?.url,
                    name: template.owner.profile_picture?.name
                }
            },
            tags: tags ? tags.map((t: any) => TemplateTagMapper.toDTO(t)) : [],
            created_on: template.meta.created_on,
            modified_on: template.meta.modified_on
        }
    }
}
