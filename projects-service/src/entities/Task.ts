import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @ManyToOne((_type) => Board, (board) => board.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "board_id", referencedColumnName: "id" })
  board: Board;

  @Column({ type: "integer", nullable: false, name: "board_id" })
  boardId: number;
}
