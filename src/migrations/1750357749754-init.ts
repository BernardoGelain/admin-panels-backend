import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1750357749754 implements MigrationInterface {
  name = 'Init1750357749754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "isSuperuser" boolean NOT NULL DEFAULT false,
        "email" character varying NOT NULL,
        "telephone" character varying NOT NULL,
        "isStaff" boolean NOT NULL DEFAULT false,
        "isActive" boolean NOT NULL DEFAULT true,
        "dateJoined" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "password" character varying NOT NULL,
        "tenantId" integer,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
