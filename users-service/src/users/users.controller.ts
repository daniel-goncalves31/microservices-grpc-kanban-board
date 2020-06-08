import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './user.schema';
import {
  MultipleUsersResponse,
  NewUserRequest,
  UserIdRequest,
  UsersProtoService,
} from './users.interface';
import { UserService } from './users.service';

@Controller()
export class UsersController implements UsersProtoService {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UsersService', 'Me')
  async me(data: UserIdRequest): Promise<User> {
    try {
      const user = await this.userService.findUserByIdOrEmail({ id: data.id });

      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: NewUserRequest): Promise<User> {
    try {
      const user = await this.userService.insertUser(data);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @GrpcMethod('UsersService', 'GetAllUsers')
  async getAllUsers(_data: {}): Promise<MultipleUsersResponse> {
    try {
      const users = await this.userService.findAllUsers();
      return { users };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
