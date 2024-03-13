import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709678519213 implements MigrationInterface {
    name = 'Migration1709678519213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "customers"
            ADD "profile_picture_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "note_documents"
            ADD CONSTRAINT "FK_1f888756178115071778b383c49" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customers"
            ADD CONSTRAINT "FK_e7574892da11dd01de5cfc46499" FOREIGN KEY ("profile_picture_id") REFERENCES "media_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "note_tags" DROP CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "customers" DROP CONSTRAINT "FK_e7574892da11dd01de5cfc46499"
        `);
        await queryRunner.query(`
            ALTER TABLE "note_documents" DROP CONSTRAINT "FK_1f888756178115071778b383c49"
        `);
        await queryRunner.query(`
            ALTER TABLE "customers" DROP COLUMN "profile_picture_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "note_tags"
            ADD CONSTRAINT "FK_bffb961e5cd19ef47e9a4ae19c5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
