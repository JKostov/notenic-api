import {MigrationInterface, QueryRunner} from "typeorm";

export class addedNoteCollaborators1569772390417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "notes" ADD "collaborators" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "collaborators"`);
    }

}
