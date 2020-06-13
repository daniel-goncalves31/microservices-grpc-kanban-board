interface NewTaskRequest {
  name: string;
  boardId: number;
}

interface UpdateTaskRequest {
  id: number;
  name: string;
}

export interface TaskResponse {
  id: number;
  name: string;
  created_at: string;
  boardId: number;
}

interface OkResponse {
  ok: boolean;
}

interface TaskIdRequest {
  boardId: number;
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
