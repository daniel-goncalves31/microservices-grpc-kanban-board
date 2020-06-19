import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/shared/auth.guard';
import { CurrentUser } from 'src/shared/decorators';
import { UserResponse } from 'src/users/users.types';
import { OkResponse } from '../tasks/task.interfaces';
import {
  NewProjectRequest,
  ProjectResponse,
  ProjectsResponse,
  UpdateProjectRequest,
} from './project.types';
import { ProjectsService } from './projects.service';

@Resolver('Project')
export class ProjectResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => ProjectsResponse)
  async getProjects(
    @CurrentUser() user: UserResponse,
  ): Promise<ProjectsResponse> {
    try {
      return await this.projectsService.fetchProjects(user.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => ProjectResponse)
  async createProject(
    @Args('newProjectInput', { type: () => NewProjectRequest })
    newProjectInput: NewProjectRequest,
    @CurrentUser() user: UserResponse,
  ): Promise<ProjectResponse> {
    try {
      const projectData = { ...newProjectInput, userId: user.id };
      return await this.projectsService.addProject(projectData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => OkResponse)
  async updateProject(
    @Args('updateProjectInput', { type: () => UpdateProjectRequest })
    updateProjectInput: UpdateProjectRequest,
  ): Promise<OkResponse> {
    try {
      return await this.projectsService.editProject(updateProjectInput);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => OkResponse)
  async deleteProject(
    @Args('projectId', { type: () => ID }) projectId: number,
  ): Promise<OkResponse> {
    try {
      return await this.projectsService.delProject(projectId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
