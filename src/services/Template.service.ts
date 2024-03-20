import {Between, ILike, IsNull, Not} from "typeorm";
import DBAdapter from "../adapters/DBAdapter";
import {Lead} from "../db/entities/Lead.entity";
import {Note} from "../db/entities/Note.entity";
import {NoteDocuments} from '../db/entities/NoteDocument.entity';
import {NoteTag} from '../db/entities/NoteTag.entity';
import {ITemplateCreateRequest} from "../interfaces/requests/templates.request.interface";
import {PaginatedTotal} from "../interfaces/responses/pagination.response.interface";
import moment from "moment";
import {BadRequest} from "../libs/Error.Lib";
import {User} from "../db/entities/User.entity";
import {Customer} from "../db/entities/Customer.entity";
import {Template} from "../db/entities/Template.entity";
import {TemplateTag} from "../db/entities/TemplateTag.entity";
import {TemplateShare} from "../db/entities/TemplateShare.entity";
import {TEMPLATE_SHARE_TYPE} from "../config";
import {Tag} from "../interfaces/tags.interface";

export default class TemplateService {
    constructor(protected template?: Template) {}

    async createTemplate (data: ITemplateCreateRequest, owner_id: number) {
        interface Tag {
            tag_id: number,
            entity: string,
            entity_id: number,
        }

        interface Share {
            to: string,
            user_id: number,
        }
        const template = await new DBAdapter().insertAndFetch(Template, {
            title: data.title,
            subject: data.title,
            content: data.content,
            category_id: data.category_id,
            owner_id
        });

        let tags;
        if (data?.tags && Object.keys(data.tags).length > 0) {
            tags = await Promise.all(
                data.tags.map(async (tag: Tag) => await this.storeTemplateTags(template.id, tag.tag_id, tag.entity, tag.entity_id))
            );
        }

        if (data?.share_with && Object.keys(data.share_with).length > 0) {
            await Promise.all(
                data.share_with.map(async (share: Share) => await this.storeTemplateShare(template.id, share.to, share.user_id))
            );
        }
        return { template, tags };
    }

    async storeTemplateTags (template_id: number, tag_id: number, entity:string, entity_id: number) {
        return await new DBAdapter().insertAndFetch(TemplateTag, {
            template_id,
            tag_id,
            entity,
            entity_id
        })
    }

    async storeTemplateShare (template_id: number, to: string, user_id: number) {
        return await new DBAdapter().insertAndFetch(TemplateShare, {
            template_id,
            share_type: to,
            user_id
        })
    }

    async allTemplates (search: string, page: number, limit: number, from?: string, to?: string):  Promise<{ total: number; items: Template[] }> {
        const skip = (page - 1) * limit;

        // TODO: use raw query here???
        const query = {
            meta: {
                deleted_flag: false,
                created_on: from && to ? Between(moment(from).toDate(), moment(to).add(1, 'days').toDate()) : undefined
            }
        }

        const [templates, total] =  await new DBAdapter().findAndCount(Template, {
            where:
                {
                    title: !search ? Not(IsNull()) : ILike("%" + search + "%"), ...query,
                    subject: !search ? Not(IsNull()) : ILike("%" + search + "%"), ...query,
                    content: !search ? Not(IsNull()) : ILike("%" + search + "%"), ...query,
                    meta: { deleted_flag: false }
                },
            skip,
            take: limit,
            relations: {
                owner: true,
                category: true
            },

            order: { id: 'DESC' }
        })
        return {items: templates, total};
    }

    async getOne(template_id: number, user_id: number) {
        let template;

        const ownQuery = {
            where: { id: template_id, owner_id: user_id, meta: { deleted_flag: false } },
            relations: { owner: true }
        };

        const sharedUserQuery = {
            where: { template_id, share_type: TEMPLATE_SHARE_TYPE.USER, user_id, meta: { deleted_flag: false } }
        };

        const sharedEveryoneQuery = {
            where: { template_id, share_type: TEMPLATE_SHARE_TYPE.EVERYONE, meta: { deleted_flag: false } }
        };

        template = await new DBAdapter().findOne(Template, ownQuery)
            || await new DBAdapter().findOne(TemplateShare, sharedUserQuery)
            || await new DBAdapter().findOne(TemplateShare, sharedEveryoneQuery);

        if (!template) throw new BadRequest('Template not found or not sharing with you.')

        const query = {
            where: { template_id, meta: { deleted_flag: false },
            }};
        const tags = await new DBAdapter().find(TemplateTag, { ...query})

        //add user/customer data to tags
        for (const tag of tags) {
            let entityData;
            if (tag.entity === 'User') {
                entityData = await new DBAdapter().findOne(User,{where: {id: tag.entity_id}});
            } else if (tag.entity === 'Customer') {
                entityData = await new DBAdapter().findOne(Customer,{where: {id: tag.entity_id}});
            }
            // Add the entity_data attribute to the tag
            tag.entity_data = entityData;
        }
        return { ...template, tags }
    }

    async updateTemplate (template_id: number, user_id: number, updates: any) {
        const db = new DBAdapter();
        const template = await db.findOne(Template, {
            where: { id: template_id, owner_id: user_id }
        });
        if (!template) throw new BadRequest('Template not found.');
        const { title, subject, content, category, share_with, tags } = updates;
        let newTags;

        if (tags) {
            await db.update(TemplateTag, { template_id }, { meta: { deleted_flag: true }});
            newTags = tags.map(async (tag: Tag) => await this.storeTemplateTags(template_id, tag.tag_id, tag.entity, tag.entity_id))

        } else {
            newTags = await db.find(TemplateTag, {  where: { template_id, meta: { deleted_flag: false } }})
        }

        if(share_with){
            await db.update(TemplateShare, { template_id }, { meta: { deleted_flag: true }});
            tags.map(async (tag: Tag) => await this.storeTemplateTags(template_id, tag.tag_id, tag.entity, tag.entity_id))
        }else{
            await db.find(TemplateShare, {  where: { template_id, meta: { deleted_flag: false } }})
        }


        const newNote = await db.updateAndFetch(Template, { id: template_id, owner_id: user_id }, {
            title,
            subject,
            content
        }, {}, { owner: true })
        return {
            ...newNote,
            tags: newTags
        };
    }

    async tagSearch (query: string) {
        const queryString = {
            where: {
                name: !query ? Not(IsNull()) : ILike("%" + query + "%"),
            }
        }
        const users = await new DBAdapter().find(User, queryString)
        const customers = await new DBAdapter().find(Customer, queryString)

        // Add an 'entity' attribute to each user object
        const usersWithEntity = users.map(user => ({ ...user, entity: 'User' }));

        // Add an 'entity' attribute to each customer object
        const customersWithEntity = customers.map(customer => ({ ...customer, entity: 'Customer' }));

        return [
            ...usersWithEntity,
            ...customersWithEntity
        ]
    }
}

