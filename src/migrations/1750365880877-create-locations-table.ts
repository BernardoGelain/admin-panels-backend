import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationsTable1750365880877 implements MigrationInterface {
  name = 'CreateLocationsTable1750365880877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "locations" (
        "id" SERIAL NOT NULL,
        "street" character varying NOT NULL,
        "lat" character varying NOT NULL,
        "long" character varying NOT NULL,
        CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
