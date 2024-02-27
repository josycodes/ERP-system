import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709045793161 implements MigrationInterface {
    name = 'Migration1709045793161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
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
        await queryRunner.query(`
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
        await queryRunner.query(`
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
        await queryRunner.query(`
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
        await queryRunner.query(`
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
        await queryRunner.query(`
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
        await queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_16d9cef47004d4053b548d3017a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "lead_assignments"
            ADD CONSTRAINT "FK_df57ae2f3bbe81624285bf3542d" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "lead_assignments"
            ADD CONSTRAINT "FK_8c0ee2384c891025ae3c63aa8eb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "lead_assignments" DROP CONSTRAINT "FK_8c0ee2384c891025ae3c63aa8eb"
        `);
        await queryRunner.query(`
            ALTER TABLE "lead_assignments" DROP CONSTRAINT "FK_df57ae2f3bbe81624285bf3542d"
        `);
        await queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_16d9cef47004d4053b548d3017a"
        `);
        await queryRunner.query(`
            DROP TABLE "activities"
        `);
        await queryRunner.query(`
            DROP TABLE "statuses"
        `);
        await queryRunner.query(`
            DROP TABLE "lead_assignments"
        `);
        await queryRunner.query(`
            DROP TABLE "leads"
        `);
        await queryRunner.query(`
            DROP TABLE "leads_categories"
        `);
        await queryRunner.query(`
            DROP TABLE "customers"
        `);
    }

}
