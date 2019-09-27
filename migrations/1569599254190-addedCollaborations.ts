import {MigrationInterface, QueryRunner} from "typeorm";

export class addedCollaborations1569599254190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "collaborations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "markdown" character varying, "image" character varying, "public" boolean NOT NULL, "tags" text array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6d843532637cb55b078793e6811" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_collaborations" ("usersId" uuid NOT NULL, "collaborationsId" uuid NOT NULL, CONSTRAINT "PK_d7d89fbd57f4ce04b0d26682e2a" PRIMARY KEY ("usersId", "collaborationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bed033915d8458ad46a310e80a" ON "users_collaborations" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ba144abf53f2dcc24d68db676" ON "users_collaborations" ("collaborationsId") `);
        await queryRunner.query(`ALTER TABLE "collaborations" ADD CONSTRAINT "FK_89e99b46bd6a726c6ae83643188" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_collaborations" ADD CONSTRAINT "FK_bed033915d8458ad46a310e80a8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_collaborations" ADD CONSTRAINT "FK_0ba144abf53f2dcc24d68db676c" FOREIGN KEY ("collaborationsId") REFERENCES "collaborations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_collaborations" DROP CONSTRAINT "FK_0ba144abf53f2dcc24d68db676c"`);
        await queryRunner.query(`ALTER TABLE "users_collaborations" DROP CONSTRAINT "FK_bed033915d8458ad46a310e80a8"`);
        await queryRunner.query(`ALTER TABLE "collaborations" DROP CONSTRAINT "FK_89e99b46bd6a726c6ae83643188"`);
        await queryRunner.query(`DROP INDEX "IDX_0ba144abf53f2dcc24d68db676"`);
        await queryRunner.query(`DROP INDEX "IDX_bed033915d8458ad46a310e80a"`);
        await queryRunner.query(`DROP TABLE "users_collaborations"`);
        await queryRunner.query(`DROP TABLE "collaborations"`);
    }

}
