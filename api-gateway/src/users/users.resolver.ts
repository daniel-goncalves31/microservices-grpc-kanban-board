import { OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { compareSync } from 'bcryptjs';
import { userGrpcClientOptions } from 'src/users/grpcUserOptions';
import { User } from './user.schema';
import {
  LoginUserInput,
  MultipleUsersResponse,
  SignUpUserInput,
  UsersProtoService,
} from './users.types';

@Resolver(_of => User)
export class UsersResolver implements OnModuleInit {
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
    @Args('userId', { type: () => String })
    userId: string,
  ): Promise<User> {
    try {
      const user = await this.userProtoService
        .getUser({ id: userId })
        .toPromise();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Query(returns => MultipleUsersResponse!)
  async getAllUsers(): Promise<MultipleUsersResponse> {
    try {
      const multipleUsers = await this.userProtoService
        .getAllUsers({})
        .toPromise();
      return multipleUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(returns => User!)
  async login(
    @Args('loginUserInput', { type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<User> {
    try {
      const user = await this.userProtoService
        .getUser({
          email: loginUserInput.email,
        })
        .toPromise();

      if (!user) {
        throw new Error('Email not found');
      }

      const isPasswordCorrect = compareSync(
        loginUserInput.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(returns => User!)
  async signUp(
    @Args('signUpUserInput', { type: () => SignUpUserInput })
    signUpUserInput: SignUpUserInput,
  ): Promise<User> {
    try {
      const user = await this.userProtoService
        .createUser(signUpUserInput)
        .toPromise();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
