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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1710318030807 = void 0;
class Migration1710318030807 {
    constructor() {
        this.name = 'Migration1710318030807';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "first_name"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "last_name"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users"
            ADD "last_name" character varying
        `);
            yield queryRunner.query(`
            ALTER TABLE "users"
            ADD "first_name" character varying
        `);
        });
    }
}
exports.Migration1710318030807 = Migration1710318030807;
