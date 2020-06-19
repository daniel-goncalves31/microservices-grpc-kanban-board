import { handleUnaryCall } from "grpc";
import { TaskResponse } from "../task/task.interfaces";

export enum Progress {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

interface Stage {
  id: number;
  progress: Progress;
  createdAt: string;
  projectId: number;
  tasks: TaskResponse[];
}

interface ProjectIdRequest {
  projectId: number;
}

interface StagesResponse {
  stages: Stage[];
}

export interface StageService {
  getAllProjectStages: handleUnaryCall<ProjectIdRequest, StagesResponse>;
}
