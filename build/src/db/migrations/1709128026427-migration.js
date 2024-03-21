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
exports.Migration1709128026427 = void 0;
class Migration1709128026427 {
    constructor() {
        this.name = 'Migration1709128026427';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014"
        `);
            yield queryRunner.query(`
            CREATE TABLE "note_documents" (
                "id" SERIAL NOT NULL,
                "note_id" integer,
                "name" character varying NOT NULL,
                "description" character varying,
                "object_key" character varying NOT NULL,
                "url" character varying,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_e8c97c496d8cf17207efcdd37ff" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "note_tags" (
                "id" SERIAL NOT NULL,
                "note_id" integer,
                "user_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_ca61a805f00b069d6a9ec15b56b" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "notes" (
                "id" SERIAL NOT NULL,
                "lead_id" integer,
                "title" character varying,
                "content" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'draft',
                "owner_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "notes"
            ADD CONSTRAINT "FK_f9e103f8ae67cb1787063597925" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "notes" DROP CONSTRAINT "FK_f9e103f8ae67cb1787063597925"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21"
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
            yield queryRunner.query(`
            DROP TABLE "notes"
        `);
            yield queryRunner.query(`
            DROP TABLE "note_tags"
        `);
            yield queryRunner.query(`
            DROP TABLE "note_documents"
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
}
exports.Migration1709128026427 = Migration1709128026427;
