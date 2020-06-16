import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@InputType()
export class NewTaskRequest {
  @Field(_type => String)
  name: string;
  @Field(_type => ID)
  stageId: number;
}

@InputType()
export class UpdateTaskRequest {
  @Field(_type => ID)
  id: number;
  @Field(_type => String)
  name: string;
}

@InputType()
export class TaskIdRequest {
  @Field(_type => ID)
  id: number;
}

@ObjectType()
export class TaskResponse {
  @Field(_type => ID)
  id: number;
  @Field(_type => String)
  name: string;
}

@ObjectType()
export class OkResponse {
  @Field(_type => Boolean)
  ok: boolean;
}

export interface TaskProtoService {
  createTask: (newTaskRequest: NewTaskRequest) => Observable<TaskResponse>;
  updateTask: (updateTaskRequest: UpdateTaskRequest) => Observable<OkResponse>;
  deleteTask: (taskIdRequest: TaskIdRequest) => Observable<OkResponse>;
}
