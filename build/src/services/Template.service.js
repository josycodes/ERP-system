"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DBAdapter_1 = __importDefault(require("../adapters/DBAdapter"));
const moment_1 = __importDefault(require("moment"));
const Error_Lib_1 = require("../libs/Error.Lib");
const User_entity_1 = require("../db/entities/User.entity");
const Customer_entity_1 = require("../db/entities/Customer.entity");
const Template_entity_1 = require("../db/entities/Template.entity");
const TemplateTag_entity_1 = require("../db/entities/TemplateTag.entity");
const TemplateShare_entity_1 = require("../db/entities/TemplateShare.entity");
const config_1 = require("../config");
class TemplateService {
    constructor(template) {
        this.template = template;
    }
    createTemplate(data, owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = yield new DBAdapter_1.default().insertAndFetch(Template_entity_1.Template, {
                title: data.title,
                subject: data.title,
                content: data.content,
                category_id: data.category_id,
                owner_id
            });
            let tags;
            if ((data === null || data === void 0 ? void 0 : data.tags) && Object.keys(data.tags).length > 0) {
                tags = yield Promise.all(data.tags.map((tag) => __awaiter(this, void 0, void 0, function* () { return yield this.storeTemplateTags(template.id, tag.tag_id, tag.entity, tag.entity_id); })));
            }
            if ((data === null || data === void 0 ? void 0 : data.share_with) && Object.keys(data.share_with).length > 0) {
                yield Promise.all(data.share_with.map((share) => __awaiter(this, void 0, void 0, function* () { return yield this.storeTemplateShare(template.id, share.to, share.user_id); })));
            }
            return { template, tags };
        });
    }
    storeTemplateTags(template_id, tag_id, entity, entity_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().insertAndFetch(TemplateTag_entity_1.TemplateTag, {
                template_id,
                tag_id,
                entity,
                entity_id
            });
        });
    }
    storeTemplateShare(template_id, to, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().insertAndFetch(TemplateShare_entity_1.TemplateShare, {
                template_id,
                share_type: to,
                user_id
            });
        });
    }
    allTemplates(search, page, limit, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            // TODO: use raw query here???
            const query = {
                meta: {
                    deleted_flag: false,
                    created_on: from && to ? (0, typeorm_1.Between)((0, moment_1.default)(from).toDate(), (0, moment_1.default)(to).add(1, 'days').toDate()) : undefined
                }
            };
            const [templates, total] = yield new DBAdapter_1.default().findAndCount(Template_entity_1.Template, {
                where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ title: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%") }, query), { subject: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%") }), query), { content: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%") }), query), { meta: { deleted_flag: false } }),
                skip,
                take: limit,
                relations: {
                    owner: true,
                    category: true
                },
                order: { id: 'DESC' }
            });
            return { items: templates, total };
        });
    }
    getOne(template_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let template;
            const ownQuery = {
                where: { id: template_id, owner_id: user_id, meta: { deleted_flag: false } },
                relations: { owner: true }
            };
            const sharedUserQuery = {
                where: { template_id, share_type: config_1.TEMPLATE_SHARE_TYPE.USER, user_id, meta: { deleted_flag: false } }
            };
            const sharedEveryoneQuery = {
                where: { template_id, share_type: config_1.TEMPLATE_SHARE_TYPE.EVERYONE, meta: { deleted_flag: false } }
            };
            template = (yield new DBAdapter_1.default().findOne(Template_entity_1.Template, ownQuery))
                || (yield new DBAdapter_1.default().findOne(TemplateShare_entity_1.TemplateShare, sharedUserQuery))
                || (yield new DBAdapter_1.default().findOne(TemplateShare_entity_1.TemplateShare, sharedEveryoneQuery));
            if (!template)
                throw new Error_Lib_1.BadRequest('Template not found or not sharing with you.');
            const query = {
                where: { template_id, meta: { deleted_flag: false },
                }
            };
            const tags = yield new DBAdapter_1.default().find(TemplateTag_entity_1.TemplateTag, Object.assign({}, query));
            //add user/customer data to tags
            for (const tag of tags) {
                let entityData;
                if (tag.entity === 'User') {
                    entityData = yield new DBAdapter_1.default().findOne(User_entity_1.User, { where: { id: tag.entity_id } });
                }
                else if (tag.entity === 'Customer') {
                    entityData = yield new DBAdapter_1.default().findOne(Customer_entity_1.Customer, { where: { id: tag.entity_id } });
                }
                // Add the entity_data attribute to the tag
                tag.entity_data = entityData;
            }
            return Object.assign(Object.assign({}, template), { tags });
        });
    }
    updateTemplate(template_id, user_id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new DBAdapter_1.default();
            const template = yield db.findOne(Template_entity_1.Template, {
                where: { id: template_id, owner_id: user_id }
            });
            if (!template)
                throw new Error_Lib_1.BadRequest('Template not found.');
            const { title, subject, content, category, share_with, tags } = updates;
            let newTags;
            if (tags) {
                yield db.update(TemplateTag_entity_1.TemplateTag, { template_id }, { meta: { deleted_flag: true } });
                newTags = tags.map((tag) => __awaiter(this, void 0, void 0, function* () { return yield this.storeTemplateTags(template_id, tag.tag_id, tag.entity, tag.entity_id); }));
            }
            else {
                newTags = yield db.find(TemplateTag_entity_1.TemplateTag, { where: { template_id, meta: { deleted_flag: false } } });
            }
            if (share_with) {
                yield db.update(TemplateShare_entity_1.TemplateShare, { template_id }, { meta: { deleted_flag: true } });
                tags.map((tag) => __awaiter(this, void 0, void 0, function* () { return yield this.storeTemplateTags(template_id, tag.tag_id, tag.entity, tag.entity_id); }));
            }
            else {
                yield db.find(TemplateShare_entity_1.TemplateShare, { where: { template_id, meta: { deleted_flag: false } } });
            }
            const newNote = yield db.updateAndFetch(Template_entity_1.Template, { id: template_id, owner_id: user_id }, {
                title,
                subject,
                content
            }, {}, { owner: true });
            return Object.assign(Object.assign({}, newNote), { tags: newTags });
        });
    }
    tagSearch(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = {
                where: {
                    name: !query ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + query + "%"),
                }
            };
            const users = yield new DBAdapter_1.default().find(User_entity_1.User, queryString);
            const customers = yield new DBAdapter_1.default().find(Customer_entity_1.Customer, queryString);
            // Add an 'entity' attribute to each user object
            const usersWithEntity = users.map(user => (Object.assign(Object.assign({}, user), { entity: 'User' })));
            // Add an 'entity' attribute to each customer object
            const customersWithEntity = customers.map(customer => (Object.assign(Object.assign({}, customer), { entity: 'Customer' })));
            return [
                ...usersWithEntity,
                ...customersWithEntity
            ];
        });
    }
}
exports.default = TemplateService;
