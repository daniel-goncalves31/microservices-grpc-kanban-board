import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { userGrpcClientOptions } from 'src/user/grpcUserOptions';
import { GrpcUserService } from './user.interface';

@Controller('user')
export class UserController implements OnModuleInit {
  @Client(userGrpcClientOptions)
  private readonly client: ClientGrpc;
  private grpcUserService: GrpcUserService;

  onModuleInit() {
    this.grpcUserService = this.client.getService<GrpcUserService>(
      'UsersService',
    );
  }

  @Get(':id')
  call(@Param('id') params: any): Observable<any> {
    return this.grpcUserService.me({ id: +params.id });
  }
}
