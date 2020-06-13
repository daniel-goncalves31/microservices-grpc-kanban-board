import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Progress, nullable: false })
  progress: Progress;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @OneToMany((_type) => Task, (task) => task.board)
  tasks: Task[];

  @ManyToOne((_type) => Project, (project) => project.boards)
  project: Project;
}
