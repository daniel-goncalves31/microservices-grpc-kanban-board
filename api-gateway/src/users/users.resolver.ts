import { OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { userGrpcClientOptions } from 'src/users/grpcUserOptions';
import { User } from './user.schema';
import {
  MultipleUsersResponse,
  NewUserRequest,
  UserIdRequest,
  UsersProtoService,
} from './users.interface';

@Resolver(_of => User)
export class UsersResolver implements OnModuleInit, UsersProtoService {
  @Client(userGrpcClientOptions)
  private readonly client: ClientGrpc;
  private userProtoService: UsersProtoService;

  onModuleInit() {
    this.userProtoService = this.client.getService<UsersProtoService>(
      'UsersService',
    );
  }

  @Query(returns => User!)
  async me(
    @Args('userdIdRequest', { type: () => UserIdRequest })
    userIdRequest: UserIdRequest,
  ): Promise<User> {
    try {
      const user = await this.userProtoService.me(userIdRequest);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(returns => User!)
  async createUser(
    @Args('newUserRequest', { type: () => NewUserRequest })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    try {
      const user = await this.userProtoService.createUser(newUserRequest);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Query(returns => MultipleUsersResponse!)
  async getAllUsers(): Promise<MultipleUsersResponse> {
    try {
      const multipleUsers = await this.userProtoService.getAllUsers({});
      return multipleUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
