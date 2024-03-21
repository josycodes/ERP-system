"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const Base_entity_1 = require("./Base.entity");
let Activity = class Activity {
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Activity.prototype, "actor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Activity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Activity.prototype, "target", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
], Activity.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false })
], Activity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'action_changes', nullable: true })
], Activity.prototype, "action_changes", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Base_entity_1.Base, { prefix: false })
], Activity.prototype, "meta", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)('activities')
], Activity);
