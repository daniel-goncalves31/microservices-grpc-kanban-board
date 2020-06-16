import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { taskGrpcClientOptions } from './grpcTaskOptions';
import {
  NewTaskRequest,
  OkResponse,
  TaskIdRequest,
  TaskProtoService,
  TaskResponse,
  UpdateTaskRequest,
} from './task.interfaces';

@Injectable()
export class TasksService implements OnModuleInit {
  @Client(taskGrpcClientOptions)
  private readonly client: ClientGrpc;

  private taskProtoService: TaskProtoService;

  onModuleInit() {
    this.taskProtoService = this.client.getService<TaskProtoService>(
      'TaskService',
    );
  }

  async addTask(newTask: NewTaskRequest): Promise<TaskResponse> {
    return await this.taskProtoService.createTask(newTask).toPromise();
  }

  async editTask(editTask: UpdateTaskRequest): Promise<OkResponse> {
    return await this.taskProtoService.updateTask(editTask).toPromise();
  }

  async removeTask(taskToRemove: TaskIdRequest): Promise<OkResponse> {
    return await this.taskProtoService.deleteTask(taskToRemove).toPromise();
  }
}
