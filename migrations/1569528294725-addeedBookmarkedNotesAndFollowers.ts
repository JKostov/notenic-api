import {MigrationInterface, QueryRunner} from "typeorm";

export class addeedBookmarkedNotesAndFollowers1569528294725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users_following_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_a41e4dcaab91b51d41267c083ea" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f257a3163914a2e398d7bfa800" ON "users_following_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a5ef04f52de98c49916c8798e" ON "users_following_users" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "users_bookmarked_notes" ("usersId" uuid NOT NULL, "notesId" uuid NOT NULL, CONSTRAINT "PK_9e7e510434d4fa6bd210e8e662f" PRIMARY KEY ("usersId", "notesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_33009222690c1bec26ba828ff5" ON "users_bookmarked_notes" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c82ee4f3f8fb54229c99ccef1" ON "users_bookmarked_notes" ("notesId") `);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_f257a3163914a2e398d7bfa8001" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_bookmarked_notes" ADD CONSTRAINT "FK_33009222690c1bec26ba828ff5d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_bookmarked_notes" ADD CONSTRAINT "FK_9c82ee4f3f8fb54229c99ccef13" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_bookmarked_notes" DROP CONSTRAINT "FK_9c82ee4f3f8fb54229c99ccef13"`);
        await queryRunner.query(`ALTER TABLE "users_bookmarked_notes" DROP CONSTRAINT "FK_33009222690c1bec26ba828ff5d"`);
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec"`);
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_f257a3163914a2e398d7bfa8001"`);
        await queryRunner.query(`DROP INDEX "IDX_9c82ee4f3f8fb54229c99ccef1"`);
        await queryRunner.query(`DROP INDEX "IDX_33009222690c1bec26ba828ff5"`);
        await queryRunner.query(`DROP TABLE "users_bookmarked_notes"`);
        await queryRunner.query(`DROP INDEX "IDX_4a5ef04f52de98c49916c8798e"`);
        await queryRunner.query(`DROP INDEX "IDX_f257a3163914a2e398d7bfa800"`);
        await queryRunner.query(`DROP TABLE "users_following_users"`);
    }

}
