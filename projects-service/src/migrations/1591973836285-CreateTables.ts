import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1591973836285 implements MigrationInterface {
  name = "CreateTables1591973836285";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "project_priority_enum" AS ENUM('0', '1', '2')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "project_status_enum" AS ENUM('0', '1')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "priority" "project_priority_enum" NOT NULL, "status" "project_status_enum" NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "stageId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "stage_progress_enum" AS ENUM('0', '1', '2')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "stage" ("id" SERIAL NOT NULL, "progress" "stage_progress_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "stage" DROP CONSTRAINT "FK_954fce22cf9a797afc6b1560c76"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "stage"`, undefined);
    await queryRunner.query(`DROP TYPE "stage_progress_enum"`, undefined);
    await queryRunner.query(`DROP TABLE "task"`, undefined);
    await queryRunner.query(`DROP TABLE "project"`, undefined);
    await queryRunner.query(`DROP TYPE "project_status_enum"`, undefined);
    await queryRunner.query(`DROP TYPE "project_priority_enum"`, undefined);
  }
}
