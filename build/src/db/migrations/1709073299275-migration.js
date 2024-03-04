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
exports.Migration1709073299275 = void 0;
class Migration1709073299275 {
    constructor() {
        this.name = 'Migration1709073299275';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "REL_cc4d7790418286bbc550b59a1c"
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "REL_cc4d7790418286bbc550b59a1c" UNIQUE ("category_id")
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
}
exports.Migration1709073299275 = Migration1709073299275;
