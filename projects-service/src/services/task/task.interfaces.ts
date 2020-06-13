import { handleUnaryCall } from "grpc";

interface NewTaskRequest {
  name: string;
  stageId: number;
}

interface UpdateTaskRequest {
  id: number;
  name: string;
}

export interface TaskResponse {
  id: number;
  name: string;
}

interface OkResponse {
  ok: boolean;
}

interface TaskIdRequest {
  id: number;
}

interface Request<T> {
  request: T;
}

export interface TaskService {
  createTask: handleUnaryCall<NewTaskRequest, TaskResponse>;
  updateTask: handleUnaryCall<UpdateTaskRequest, OkResponse>;
  deleteTask: handleUnaryCall<TaskIdRequest, OkResponse>;
}
