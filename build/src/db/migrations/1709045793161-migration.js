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
exports.Migration1709045793161 = void 0;
class Migration1709045793161 {
    constructor() {
        this.name = 'Migration1709045793161';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE "customers" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "address" character varying,
                "preferred_contact_method" character varying DEFAULT 'email',
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "leads_categories" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_321ab13c2e2b7d4eca32ed848c3" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "leads" (
                "id" SERIAL NOT NULL,
                "customer_id" integer,
                "category_id" integer,
                "lead_code" character varying NOT NULL,
                "message" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'new',
                "lead_value" numeric,
                "lead_source" character varying,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "REL_cc4d7790418286bbc550b59a1c" UNIQUE ("category_id"),
                CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "lead_assignments" (
                "id" SERIAL NOT NULL,
                "lead_id" integer,
                "user_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "REL_df57ae2f3bbe81624285bf3542" UNIQUE ("lead_id"),
                CONSTRAINT "PK_4478e8c2c0483fd8f3ff0f194e4" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "statuses" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "activities" (
                "id" SERIAL NOT NULL,
                "actor" character varying,
                "action" character varying,
                "target" character varying,
                "details" character varying,
                "category" character varying NOT NULL,
                "action_changes" jsonb,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_16d9cef47004d4053b548d3017a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "lead_assignments"
            ADD CONSTRAINT "FK_df57ae2f3bbe81624285bf3542d" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "lead_assignments"
            ADD CONSTRAINT "FK_8c0ee2384c891025ae3c63aa8eb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "lead_assignments" DROP CONSTRAINT "FK_8c0ee2384c891025ae3c63aa8eb"
        `);
            yield queryRunner.query(`
            ALTER TABLE "lead_assignments" DROP CONSTRAINT "FK_df57ae2f3bbe81624285bf3542d"
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
            yield queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_16d9cef47004d4053b548d3017a"
        `);
            yield queryRunner.query(`
            DROP TABLE "activities"
        `);
            yield queryRunner.query(`
            DROP TABLE "statuses"
        `);
            yield queryRunner.query(`
            DROP TABLE "lead_assignments"
        `);
            yield queryRunner.query(`
            DROP TABLE "leads"
        `);
            yield queryRunner.query(`
            DROP TABLE "leads_categories"
        `);
            yield queryRunner.query(`
            DROP TABLE "customers"
        `);
        });
    }
}
exports.Migration1709045793161 = Migration1709045793161;
