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
exports.Migration1708681628352 = void 0;
class Migration1708681628352 {
    constructor() {
        this.name = 'Migration1708681628352';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE "media_files" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "object_key" character varying NOT NULL,
                "url" character varying,
                "user_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_93b4da6741cd150e76f9ac035d8" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying,
                "password" character varying NOT NULL,
                "first_name" character varying,
                "last_name" character varying,
                "status" character varying NOT NULL DEFAULT 'pending',
                "profile_picture_id" integer,
                "created_on" TIMESTAMP DEFAULT now(),
                "created_by" character varying,
                "modified_on" TIMESTAMP,
                "modified_by" character varying,
                "deleted_flag" boolean DEFAULT false,
                "deleted_on" TIMESTAMP,
                "deleted_by" character varying,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files"
            ADD CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_02ec15de199e79a0c46869895f4" FOREIGN KEY ("profile_picture_id") REFERENCES "media_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_02ec15de199e79a0c46869895f4"
        `);
            yield queryRunner.query(`
            ALTER TABLE "media_files" DROP CONSTRAINT "FK_8cfa31648f9bfdb58c30a128014"
        `);
            yield queryRunner.query(`
            DROP TABLE "users"
        `);
            yield queryRunner.query(`
            DROP TABLE "media_files"
        `);
        });
    }
}
exports.Migration1708681628352 = Migration1708681628352;
