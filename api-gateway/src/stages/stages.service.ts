import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcStageOptions } from './grpcStageOptions';
import { StageProtoService, StagesResponse } from './stage.types';

@Injectable()
export class StagesService implements OnModuleInit {
  @Client(grpcStageOptions)
  private readonly client: ClientGrpc;

  private stageProtoService: StageProtoService;

  onModuleInit() {
    this.stageProtoService = this.client.getService<StageProtoService>(
      'StageService',
    );
  }

  async getStages(projectId: number): Promise<StagesResponse> {
    return await this.stageProtoService
      .getAllProjectStages({ projectId })
      .toPromise();
  }
}
