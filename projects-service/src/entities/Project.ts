import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board";

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "enum", enum: Priority, nullable: false })
  priority: Priority;

  @Column({ type: "enum", enum: Status, default: Status.IN_PROGRESS })
  status: Status;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: string;

  @Column({ type: "varchar", nullable: false, name: "user_id" })
  userId: string;

  @OneToMany((_type) => Board, (board) => board.project)
  boards: Board[];
}
