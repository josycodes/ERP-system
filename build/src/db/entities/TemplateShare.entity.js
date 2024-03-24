"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateShare = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
const Template_entity_1 = require("./Template.entity");
const User_entity_1 = require("./User.entity");
let TemplateShare = class TemplateShare {
};
exports.TemplateShare = TemplateShare;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], TemplateShare.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], TemplateShare.prototype, "template_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], TemplateShare.prototype, "share_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], TemplateShare.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    (0, typeorm_1.ManyToOne)(() => Template_entity_1.Template, { nullable: true })
], TemplateShare.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { nullable: true })
], TemplateShare.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], TemplateShare.prototype, "meta", void 0);
exports.TemplateShare = TemplateShare = __decorate([
    (0, typeorm_1.Entity)('template_share')
], TemplateShare);
