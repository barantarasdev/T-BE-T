import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11717457612393 implements MigrationInterface {
    name = 'Migration11717457612393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "product_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "product_factory_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "product_factory_product_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "product_factory_factory_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "factory" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "factory" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_" ADD CONSTRAINT "UQ_703b00f21432e6eb0cb30de7d58" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fc621ce2b11e5e5e24d6074ef6b" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "FK_c65bcd0bcbea63af36e466d68eb" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "FK_36facf5dd21e081ce3539b3f808" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "FK_36facf5dd21e081ce3539b3f808"`);
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "FK_c65bcd0bcbea63af36e466d68eb"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fc621ce2b11e5e5e24d6074ef6b"`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "password" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_" DROP CONSTRAINT "UQ_703b00f21432e6eb0cb30de7d58"`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "factory" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "factory" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "product_factory_factory_id_fkey" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "product_factory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "product_factory_id_fkey" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
