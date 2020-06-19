import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';

enum Status {
  COMPLETED,
  IN_PROGRESS,
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

registerEnumType(Status, {
  name: 'Status',
});

registerEnumType(Priority, {
  name: 'Priority',
});

@ObjectType()
export class ProjectResponse {
  @Field(_type => ID)
  id: number;

  @Field(_type => String)
  name: string;

  @Field(_type => Priority)
  priority: Priority;

  @Field(_type => Status)
  status: Status;

  @Field(_type => String)
  createdAt: string;

  @Field(_type => ID)
  userId: string;
}

@ObjectType()
export class ProjectsResponse {
  @Field(_type => [ProjectResponse])
  projects: ProjectResponse[];
}

@ObjectType()
export class OkResponse {
  @Field(_type => Boolean)
  ok: boolean;
}

@InputType()
export class NewProjectRequest {
  @Field(_type => String)
  name: string;

  @Field(_type => Priority)
  priority: Priority;

  userId: string;
}

@InputType()
export class UpdateProjectRequest {
  @Field(_type => ID)
  id: number;

  @Field(_type => String)
  name: string;

  @Field(_type => Status)
  status: Status;

  @Field(_type => Priority)
  priority: Priority;
}

class UserIdRequest {
  userId: string;
}

class ProjectIdRequest {
  id: number;
}

export interface ProjectProtoService {
  getAllProjects: (
    userIdRequest: UserIdRequest,
  ) => Observable<ProjectsResponse>;
  createProject: (
    newProjectRequest: NewProjectRequest,
  ) => Observable<ProjectResponse>;
  updateProject: (
    updateProjectRequest: UpdateProjectRequest,
  ) => Observable<OkResponse>;
  deleteProject: (projectIdRequest: ProjectIdRequest) => Observable<OkResponse>;
}
