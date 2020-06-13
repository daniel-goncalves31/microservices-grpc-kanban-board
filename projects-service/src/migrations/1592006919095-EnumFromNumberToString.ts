import { MigrationInterface, QueryRunner } from "typeorm";

export class EnumFromNumberToString1592006919095 implements MigrationInterface {
  name = "EnumFromNumberToString1592006919095";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TYPE "public"."project_priority_enum" RENAME TO "project_priority_enum_old"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "project_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "priority" TYPE "project_priority_enum" USING "priority"::"text"::"project_priority_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "project_priority_enum_old"`, undefined);
    await queryRunner.query(
      `ALTER TYPE "public"."project_status_enum" RENAME TO "project_status_enum_old"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "project_status_enum" AS ENUM('IN_PROGRESS', 'COMPLETED')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" TYPE "project_status_enum" USING "status"::"text"::"project_status_enum"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "project_status_enum_old"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
      undefined
    );
    await queryRunner.query(
      `ALTER TYPE "public"."stage_progress_enum" RENAME TO "stage_progress_enum_old"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "stage_progress_enum" AS ENUM('TODO', 'DOING', 'DONE')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ALTER COLUMN "progress" TYPE "stage_progress_enum" USING "progress"::"text"::"stage_progress_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "stage_progress_enum_old"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "stage_progress_enum_old" AS ENUM('0', '1', '2')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ALTER COLUMN "progress" TYPE "stage_progress_enum_old" USING "progress"::"text"::"stage_progress_enum_old"`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "stage_progress_enum"`, undefined);
    await queryRunner.query(
      `ALTER TYPE "stage_progress_enum_old" RENAME TO  "stage_progress_enum"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT '0'`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "project_status_enum_old" AS ENUM('0', '1')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" DROP DEFAULT`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" TYPE "project_status_enum_old" USING "status"::"text"::"project_status_enum_old"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "project_status_enum"`, undefined);
    await queryRunner.query(
      `ALTER TYPE "project_status_enum_old" RENAME TO  "project_status_enum"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "project_priority_enum_old" AS ENUM('0', '1', '2')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "priority" TYPE "project_priority_enum_old" USING "priority"::"text"::"project_priority_enum_old"`,
      undefined
    );
    await queryRunner.query(`DROP TYPE "project_priority_enum"`, undefined);
    await queryRunner.query(
      `ALTER TYPE "project_priority_enum_old" RENAME TO  "project_priority_enum"`,
      undefined
    );
  }
}
