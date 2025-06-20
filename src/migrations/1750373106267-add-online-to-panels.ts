import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOnlineToPanels1750373106267 implements MigrationInterface {
  name = 'AddOnlineToPanels1750373106267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "panels"
      ADD "online" boolean NOT NULL DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "panels"
      DROP COLUMN "online"
    `);
  }
}
