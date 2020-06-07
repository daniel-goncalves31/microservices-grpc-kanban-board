import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

interface UserId {
  id: number;
}

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UsersService', 'Me')
  me(data: UserId, metadata: any): any {
    return {
      id: 1,
      name: 'Daniel Gonçalves',
      password: '123456',
      email: 'admin@admin.com',
    };
  }

  @Get('/')
  async getAll() {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
