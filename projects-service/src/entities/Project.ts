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
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

enum Status {
  IN_PROGRESS = 0,
  COMPLETED = 1,
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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "varchar", nullable: false })
  user_id: string;

  @OneToMany((_type) => Board, (board) => board.project)
  boards: Board[];
}
