import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { TaskResponse } from '../tasks/task.interfaces';

export enum Progress {
  TODO,
  DOING,
  DONE,
}

registerEnumType(Progress, {
  name: 'Progress',
});

@ObjectType()
class Stage {
  @Field(_type => ID)
  id: number;

  @Field(_type => Progress)
  progress: Progress;

  createdAt: string;

  @Field(_type => ID)
  projectId: number;

  @Field(_type => [TaskResponse])
  tasks: TaskResponse[];
}

@InputType()
class ProjectIdRequest {
  @Field(_type => ID)
  projectId: number;
}
@ObjectType()
export class StagesResponse {
  @Field(_type => [Stage])
  stages: Stage[];
}

export interface StageProtoService {
  getAllProjectStages: (
    projectIdRequest: ProjectIdRequest,
  ) => Observable<StagesResponse>;
}
