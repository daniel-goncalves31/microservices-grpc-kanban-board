import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { StagesResponse } from './stage.types';
import { StagesService } from './stages.service';

@Resolver()
export class StagesResolver {
  constructor(private readonly stagesService: StagesService) {}

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
