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
exports.Migration1709188644564 = void 0;
class Migration1709188644564 {
    constructor() {
        this.name = 'Migration1709188644564';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ADD "lead_id" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "object_key" DROP NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_428cd1664e3cad5067b80ab1443" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_428cd1664e3cad5067b80ab1443"
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014"
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "object_key"
            SET NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files" DROP COLUMN "lead_id"
        `);
        });
    }
}
exports.Migration1709188644564 = Migration1709188644564;
