interface NewTaskRequest {
  name: string;
  board_id: number;
}

interface UpdateTaskRequest {
  id: number;
  name: string;
}

interface TaskResponse {
  id: number;
  name: string;
  created_at: string;
  board_id: number;
}

interface OkResponse {
  ok: boolean;
}

interface TaskIdRequest {
  board_id: number;
}

interface Request<T> {
  request: T;
}

export interface TaskService {
  createTask: (
    call: Request<NewTaskRequest>,
    callback: (error: Error | null, res?: TaskResponse) => {}
  ) => void;
  updateTask: (
    call: Request<UpdateTaskRequest>,
    callback: (error: Error | null, res?: OkResponse) => {}
  ) => void;
  deleteTask: (
    call: Request<TaskIdRequest>,
    callback: (error: Error | null, res?: OkResponse) => {}
  ) => void;
}
