import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { userGrpcClientOptions } from './grpcUserOptions';
import { SignUpUserInput, UsersProtoService } from './users.types';

@Injectable()
export class UsersService implements OnModuleInit {
  @Client(userGrpcClientOptions)
  private readonly client: ClientGrpc;
  private userProtoService: UsersProtoService;

  onModuleInit() {
    this.userProtoService = this.client.getService<UsersProtoService>(
      'UsersService',
    );
  }

  async getUserById(userId: string) {
    const user = await this.userProtoService
      .getUser({ id: userId })
      .toPromise();
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userProtoService.getUser({ email }).toPromise();
    return user;
  }

  async getAllUsers() {
    const multipleUsers = await this.userProtoService
      .getAllUsers({})
      .toPromise();
    return multipleUsers;
  }

  async createUser(userCredentials: SignUpUserInput) {
    const user = await this.userProtoService
      .createUser(userCredentials)
      .toPromise();
    return user;
  }
}
