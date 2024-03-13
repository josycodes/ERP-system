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
exports.Migration1709678519213 = void 0;
class Migration1709678519213 {
    constructor() {
        this.name = 'Migration1709678519213';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "customers"
            ADD "profile_picture_id" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_documents"
            ADD CONSTRAINT "FK_1f888756178115071778b383c49" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "customers"
            ADD CONSTRAINT "FK_e7574892da11dd01de5cfc46499" FOREIGN KEY ("profile_picture_id") REFERENCES "media_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "customers" DROP CONSTRAINT "FK_e7574892da11dd01de5cfc46499"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_documents" DROP CONSTRAINT "FK_1f888756178115071778b383c49"
        `);
            yield queryRunner.query(`
            ALTER TABLE "customers" DROP COLUMN "profile_picture_id"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
}
exports.Migration1709678519213 = Migration1709678519213;
