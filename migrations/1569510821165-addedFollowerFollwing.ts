import {MigrationInterface, QueryRunner} from "typeorm";

export class addedFollowerFollwing1569510821165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users_following_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_a41e4dcaab91b51d41267c083ea" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f257a3163914a2e398d7bfa800" ON "users_following_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a5ef04f52de98c49916c8798e" ON "users_following_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_f257a3163914a2e398d7bfa8001" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec"`);
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_f257a3163914a2e398d7bfa8001"`);
        await queryRunner.query(`DROP INDEX "IDX_4a5ef04f52de98c49916c8798e"`);
        await queryRunner.query(`DROP INDEX "IDX_f257a3163914a2e398d7bfa800"`);
        await queryRunner.query(`DROP TABLE "users_following_users"`);
    }

}
