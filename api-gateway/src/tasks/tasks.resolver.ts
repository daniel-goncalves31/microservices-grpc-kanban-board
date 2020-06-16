import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/shared/auth.guard';
import {
  NewTaskRequest,
  OkResponse,
  TaskIdRequest,
  TaskResponse,
  UpdateTaskRequest,
} from './task.interfaces';
import { TasksService } from './tasks.service';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => TaskResponse)
  async newTask(
    @Args('newTaskInput', { type: () => NewTaskRequest })
    newTaskInput: NewTaskRequest,
  ): Promise<TaskResponse> {
    try {
      const task = await this.tasksService.addTask(newTaskInput);
      return task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => OkResponse)
  async updateTask(
    @Args('updateTaskInput', { type: () => UpdateTaskRequest })
    updateTaskInput: UpdateTaskRequest,
  ): Promise<OkResponse> {
    try {
      const ok = await this.tasksService.editTask(updateTaskInput);
      return ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => OkResponse)
  async deleteTask(
    @Args('taskIdInput', { type: () => TaskIdRequest })
    taskIdInput: TaskIdRequest,
  ): Promise<OkResponse> {
    try {
      const ok = await this.tasksService.removeTask(taskIdInput);
      return ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
