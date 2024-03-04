"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadCategory = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
let LeadCategory = class LeadCategory {
};
exports.LeadCategory = LeadCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], LeadCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false })
], LeadCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], LeadCategory.prototype, "meta", void 0);
exports.LeadCategory = LeadCategory = __decorate([
    (0, typeorm_1.Entity)('leads_categories')
], LeadCategory);
