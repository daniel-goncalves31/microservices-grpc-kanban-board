import { handleUnaryCall } from "grpc";

enum Status {
  COMPLETED = 0,
  IN_PROGRESS = 1,
}

enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

interface ProjectResponse {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  userId: string;
}

interface NewProjectRequest {
  name: string;
  priority: Priority;
  userId: string;
}

interface UpdateProjectRequest {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
}

interface ProjectsResponse {
  projects: ProjectResponse[];
}

interface UserIdRequest {
  userId: string;
}

interface OkResponse {
  ok: boolean;
}

interface ProjectIdRequest {
  id: number;
}

export interface ProjectService {
  getAllProjects: handleUnaryCall<UserIdRequest, ProjectsResponse>;
  createProject: handleUnaryCall<NewProjectRequest, ProjectResponse>;
  updateProject: handleUnaryCall<UpdateProjectRequest, OkResponse>;
  deleteProject: handleUnaryCall<ProjectIdRequest, OkResponse>;
}
