import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";

enum Progress {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

@Entity()
export class Stage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Progress, nullable: false })
  progress: Progress;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @OneToMany((_type) => Task, (task) => task.stage)
  tasks: Task[];

  @ManyToOne((_type) => Project, (project) => project.stages, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @Column({ type: "integer", nullable: false, name: "project_id" })
  projectId: number;
}
