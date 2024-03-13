"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadAssignment = void 0;
const typeorm_1 = require("typeorm");
const Lead_entity_1 = require("./Lead.entity");
const User_entity_1 = require("./User.entity");
const Base_entity_1 = require("./Base.entity");
let LeadAssignment = class LeadAssignment {
};
exports.LeadAssignment = LeadAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], LeadAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lead_id', type: 'int', nullable: true })
], LeadAssignment.prototype, "lead_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int', nullable: true })
], LeadAssignment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'lead_id' }),
    (0, typeorm_1.OneToOne)(() => Lead_entity_1.Lead)
], LeadAssignment.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User)
], LeadAssignment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], LeadAssignment.prototype, "meta", void 0);
exports.LeadAssignment = LeadAssignment = __decorate([
    (0, typeorm_1.Entity)('lead_assignments')
], LeadAssignment);
