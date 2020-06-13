import { TaskResponse } from "../task/task.interfaces";

export enum Progress {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

interface Board {
  id: number;
  progress: Progress;
  createdAt: string;
  projectId: number;
  task: TaskResponse[];
}

interface EmptyRequest {}

interface BoardsResponse {
  boards: Board[];
}

interface Request<T> {
  request: T;
}

export interface BoardService {
  getAllBoards: (
    call: Request<EmptyRequest>,
    callback: (error: Error | null, res?: BoardsResponse) => {}
  ) => void;
}
