import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/shared/auth.guard';
import { StagesResponse } from './stage.types';
import { StagesService } from './stages.service';

@Resolver()
export class StagesResolver {
  constructor(private readonly stagesService: StagesService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => StagesResponse)
  async getStages(
    @Args('projectId', { type: () => ID }) projectId: number,
  ): Promise<StagesResponse> {
    try {
      return await this.stagesService.getStages(projectId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
