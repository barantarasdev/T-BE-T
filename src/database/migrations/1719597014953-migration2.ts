import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21719597014953 implements MigrationInterface {
    name = 'Migration21719597014953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "REL_94f168faad896c0786646fa3d4"`);
        await queryRunner.query(`CREATE INDEX "IDX_94f168faad896c0786646fa3d4" ON "token" ("userId") `);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user_"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94f168faad896c0786646fa3d4"`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user_"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
