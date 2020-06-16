import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/shared/decorators';
import { UserAuthGuard } from '../shared/auth.guard';
import { UsersService } from './users.service';
import { MultipleUsersResponse, UserResponse } from './users.types';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => UserResponse, { nullable: true })
  async me(@CurrentUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }

  @UseGuards(UserAuthGuard)
  @Query(() => MultipleUsersResponse)
  async getAllUsers(): Promise<MultipleUsersResponse> {
    try {
      const multipleUsers = await this.usersService.getAllUsers();
      return multipleUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
