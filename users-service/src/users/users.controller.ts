import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { User } from './user.schema';
import {
  GetUserRequest,
  MultipleUsersResponse,
  NewUserRequest,
  UsersProtoService,
} from './users.interface';
import { UserService } from './users.service';

@Controller()
export class UsersController implements UsersProtoService {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UsersService', 'GetUser')
  async getUser(data: GetUserRequest): Promise<User> {
    try {
      const user = await this.userService.findUserByIdOrEmail(data);
      if (!user) {
        return {} as User;
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: NewUserRequest): Promise<User> {
    try {
      const user = await this.userService.insertUser(data);
      return user;
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('UsersService', 'GetAllUsers')
  async getAllUsers(_data: {}): Promise<MultipleUsersResponse> {
    try {
      const users = await this.userService.findAllUsers();
      return { users };
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }
}
