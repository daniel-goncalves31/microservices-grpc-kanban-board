import { Module } from '@nestjs/common';
import { ProjectResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  providers: [ProjectsService, ProjectResolver],
})
export class ProjectsModule {}
