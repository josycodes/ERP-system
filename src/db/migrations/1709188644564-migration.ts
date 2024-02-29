import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709188644564 implements MigrationInterface {
    name = 'Migration1709188644564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ADD "lead_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "object_key" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_428cd1664e3cad5067b80ab1443" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_428cd1664e3cad5067b80ab1443"
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014"
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "object_key"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "media_files" DROP COLUMN "lead_id"
        `);
    }

}
