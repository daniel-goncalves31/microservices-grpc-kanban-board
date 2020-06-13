import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Stage } from "./Stage";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @ManyToOne((_type) => Stage, (stage) => stage.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "stage_id", referencedColumnName: "id" })
  stage: Stage;

  @Column({ type: "integer", nullable: false, name: "stage_id" })
  stageId: number;
}
