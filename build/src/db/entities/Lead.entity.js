"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const typeorm_1 = require("typeorm");
const Customer_entity_1 = require("./Customer.entity");
const Category_entity_1 = require("./Category.entity");
const Base_entity_1 = require("./Base.entity");
let Lead = class Lead {
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Lead.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'int', nullable: true })
], Lead.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'int', nullable: true })
], Lead.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lead_code', type: 'varchar', nullable: false })
], Lead.prototype, "lead_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'message', type: 'text', nullable: false })
], Lead.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', nullable: false, default: 'new' })
], Lead.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lead_value', type: 'numeric', nullable: true })
], Lead.prototype, "lead_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lead_source', type: 'varchar', nullable: true })
], Lead.prototype, "lead_source", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    (0, typeorm_1.ManyToOne)(() => Customer_entity_1.Customer)
], Lead.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    (0, typeorm_1.ManyToOne)(() => Category_entity_1.Category)
], Lead.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], Lead.prototype, "meta", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)('leads')
], Lead);
