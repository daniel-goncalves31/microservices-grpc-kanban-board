import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedModelsTypes1592022414598 implements MigrationInterface {
  name = "ChangedModelsTypes1592022414598";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" DROP CONSTRAINT "FK_954fce22cf9a797afc6b1560c76"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" RENAME COLUMN "stageId" TO "stage_id"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" RENAME COLUMN "projectId" TO "project_id"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "stage_id" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ALTER COLUMN "project_id" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD CONSTRAINT "FK_82669bdc9b6ff6943d29de98499" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "stage" DROP CONSTRAINT "FK_82669bdc9b6ff6943d29de98499"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ALTER COLUMN "project_id" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "stage_id" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" RENAME COLUMN "project_id" TO "projectId"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" RENAME COLUMN "stage_id" TO "stageId"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }
}
