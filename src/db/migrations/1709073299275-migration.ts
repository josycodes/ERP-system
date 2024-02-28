import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709073299275 implements MigrationInterface {
    name = 'Migration1709073299275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "REL_cc4d7790418286bbc550b59a1c"
        `);
        await queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "leads" DROP CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "REL_cc4d7790418286bbc550b59a1c" UNIQUE ("category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "leads"
            ADD CONSTRAINT "FK_cc4d7790418286bbc550b59a1ce" FOREIGN KEY ("category_id") REFERENCES "leads_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
