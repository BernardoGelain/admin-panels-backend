import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePanelsTable1750365880878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "panels" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "groupId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "locationId" integer,
        "tenantId" integer,
        CONSTRAINT "PK_panels_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "panels"
      ADD CONSTRAINT "FK_panels_location" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "panels" DROP CONSTRAINT "FK_panels_location"`,
    );
    await queryRunner.query(`DROP TABLE "panels"`);
  }
}
