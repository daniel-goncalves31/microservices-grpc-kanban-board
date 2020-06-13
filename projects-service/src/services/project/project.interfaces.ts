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

interface EmptyRequest {}

interface OkResponse {
  ok: boolean;
}

interface ProjectIdRequest {
  id: number;
}

interface Request<T> {
  request: T;
}

export interface ProjectService {
  getAllProjects: (
    call: Request<EmptyRequest>,
    callback: (error: Error | null, res?: ProjectsResponse) => {}
  ) => void;
  createProject: (
    call: Request<NewProjectRequest>,
    callback: (error: Error | null, res?: ProjectResponse) => {}
  ) => void;
  updateProject: (
    call: Request<UpdateProjectRequest>,
    callback: (error: Error | null, res?: OkResponse) => {}
  ) => void;
  deleteProject: (
    call: Request<ProjectIdRequest>,
    callback: (error: Error | null, res?: OkResponse) => {}
  ) => void;
}
