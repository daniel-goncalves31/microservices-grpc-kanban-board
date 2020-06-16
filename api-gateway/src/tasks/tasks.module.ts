import { Module } from '@nestjs/common';
import { TaskResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
