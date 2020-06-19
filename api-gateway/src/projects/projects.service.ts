import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcOptions } from '../shared/grpcOptions';
import {
  NewProjectRequest,
  OkResponse,
  ProjectProtoService,
  ProjectResponse,
  ProjectsResponse,
  UpdateProjectRequest,
} from './project.types';

@Injectable()
export class ProjectsService implements OnModuleInit {
  @Client(grpcOptions)
  private readonly client: ClientGrpc;

  private projectProtoService: ProjectProtoService;

  onModuleInit() {
    this.projectProtoService = this.client.getService<ProjectProtoService>(
      'ProjectService',
    );
  }

  async fetchProjects(userId: string): Promise<ProjectsResponse> {
    return await this.projectProtoService
      .getAllProjects({ userId })
      .toPromise();
  }

  async addProject(
    newProjectData: NewProjectRequest,
  ): Promise<ProjectResponse> {
    return await this.projectProtoService
      .createProject(newProjectData)
      .toPromise();
  }

  async editProject(
    updateProjectData: UpdateProjectRequest,
  ): Promise<OkResponse> {
    return await this.projectProtoService
      .updateProject(updateProjectData)
      .toPromise();
  }

  async delProject(projectId: number): Promise<OkResponse> {
    return await this.projectProtoService
      .deleteProject({ id: projectId })
      .toPromise();
  }
}
