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
exports.Migration1711009123253 = void 0;
class Migration1711009123253 {
    constructor() {
        this.name = 'Migration1711009123253';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
            yield queryRunner.query(`
            CREATE TABLE "templates" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "subject" character varying,
                "content" text NOT NULL,
                "category_id" integer,
                "owner_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "template_tags" (
                "id" SERIAL NOT NULL,
                "template_id" integer,
                "tag_id" integer,
                "entity" character varying,
                "entity_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_23f3328ba59f875e1beca9d2b0b" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "template_share" (
                "id" SERIAL NOT NULL,
                "template_id" integer,
                "share_type" character varying,
                "user_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_182447c9a574528aa669b0e95d8" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD "tag_id" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD "entity" character varying
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD "entity_id" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD "user__id" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "templates"
            ADD CONSTRAINT "FK_aa53d14ade9be5c31a2f2127304" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "templates"
            ADD CONSTRAINT "FK_1142069df0385c3e7f3a3080dc2" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_tags"
            ADD CONSTRAINT "FK_075233873d1fa9d810a770b059a" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_share"
            ADD CONSTRAINT "FK_74f4aa603fa7516940dfb539937" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_share"
            ADD CONSTRAINT "FK_d28a8a5c01d4d6163a5638df44c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_f9f452f72041b0d5e3a17bcc093" FOREIGN KEY ("user__id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_f9f452f72041b0d5e3a17bcc093"
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_share" DROP CONSTRAINT "FK_d28a8a5c01d4d6163a5638df44c"
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_share" DROP CONSTRAINT "FK_74f4aa603fa7516940dfb539937"
        `);
            yield queryRunner.query(`
            ALTER TABLE "template_tags" DROP CONSTRAINT "FK_075233873d1fa9d810a770b059a"
        `);
            yield queryRunner.query(`
            ALTER TABLE "templates" DROP CONSTRAINT "FK_1142069df0385c3e7f3a3080dc2"
        `);
            yield queryRunner.query(`
            ALTER TABLE "templates" DROP CONSTRAINT "FK_aa53d14ade9be5c31a2f2127304"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP COLUMN "user__id"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP COLUMN "entity_id"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP COLUMN "entity"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags" DROP COLUMN "tag_id"
        `);
            yield queryRunner.query(`
            DROP TABLE "template_share"
        `);
            yield queryRunner.query(`
            DROP TABLE "template_tags"
        `);
            yield queryRunner.query(`
            DROP TABLE "templates"
        `);
            yield queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
}
exports.Migration1711009123253 = Migration1711009123253;
