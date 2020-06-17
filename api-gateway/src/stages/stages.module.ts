import { Module } from '@nestjs/common';
import { StagesResolver } from './stages.resolver';
import { StagesService } from './stages.service';

@Module({
  providers: [StagesService, StagesResolver],
})
export class StagesModule {}
