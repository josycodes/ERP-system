"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
const User_entity_1 = require("./User.entity");
const Category_entity_1 = require("./Category.entity");
let Template = class Template {
};
exports.Template = Template;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Template.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Template.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Template.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false })
], Template.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], Template.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], Template.prototype, "owner_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user)
], Template.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    (0, typeorm_1.ManyToOne)(() => Category_entity_1.Category, (category) => category)
], Template.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], Template.prototype, "meta", void 0);
exports.Template = Template = __decorate([
    (0, typeorm_1.Entity)('templates')
], Template);
