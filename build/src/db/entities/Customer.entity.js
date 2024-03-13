"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
const MediaFile_entity_1 = require("./MediaFile.entity");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', nullable: false })
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', nullable: false })
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', nullable: false })
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', nullable: true })
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_contact_method', type: 'varchar', nullable: true, default: 'email' })
], Customer.prototype, "preferred_contact_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_picture_id', type: 'int', nullable: true })
], Customer.prototype, "profile_picture_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'profile_picture_id' }),
    (0, typeorm_1.ManyToOne)(() => MediaFile_entity_1.MediaFile, { nullable: true })
], Customer.prototype, "profile_picture", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], Customer.prototype, "meta", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);
