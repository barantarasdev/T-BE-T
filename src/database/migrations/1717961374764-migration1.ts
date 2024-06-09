import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11717961374764 implements MigrationInterface {
    name = 'Migration11717961374764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "factory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "factory_id" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_703b00f21432e6eb0cb30de7d58" UNIQUE ("email"), CONSTRAINT "PK_457bfa3e35350a716846b03102d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_factory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "factory_id" uuid NOT NULL, CONSTRAINT "PK_fc621ce2b11e5e5e24d6074ef6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fc621ce2b11e5e5e24d6074ef6b" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "FK_c65bcd0bcbea63af36e466d68eb" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_factory" ADD CONSTRAINT "FK_36facf5dd21e081ce3539b3f808" FOREIGN KEY ("factory_id") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "FK_36facf5dd21e081ce3539b3f808"`);
        await queryRunner.query(`ALTER TABLE "product_factory" DROP CONSTRAINT "FK_c65bcd0bcbea63af36e466d68eb"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fc621ce2b11e5e5e24d6074ef6b"`);
        await queryRunner.query(`DROP TABLE "product_factory"`);
        await queryRunner.query(`DROP TABLE "user_"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "factory"`);
    }

}
