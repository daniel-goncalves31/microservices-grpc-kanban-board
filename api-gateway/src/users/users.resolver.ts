import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/shared/auth.guard';
import { User } from './user.schema';
import { UsersService } from './users.service';
import { MultipleUsersResponse } from './users.types';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Query(returns => User!)
  async me(
    @Args('userId', { type: () => String })
    userId: string,
  ): Promise<User> {
    try {
      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(UserAuthGuard)
  @Query(returns => MultipleUsersResponse!)
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
