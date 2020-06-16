import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { Response } from 'express';
import { ResGql } from '../shared/decorators';
import { UsersService } from '../users/users.service';
import {
  LoginUserInput,
  SignUpUserInput,
  UserResponse,
} from '../users/users.types';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => UserResponse)
  async login(
    @Args('loginUserInput', { type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
    @ResGql() res: Response,
  ): Promise<UserResponse> {
    try {
      const user = await this.usersService.getUserByEmail(loginUserInput.email);
      if (!user.id) {
        throw new Error('Email not found');
      }

      const isPasswordCorrect = compareSync(
        loginUserInput.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
      }

      const token = this.jwtService.sign({ userId: user.id });
      res.cookie('jwt', token, { httpOnly: true });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => UserResponse)
  async signUp(
    @Args('signUpUserInput', { type: () => SignUpUserInput })
    signUpUserInput: SignUpUserInput,
    @ResGql() res: Response,
  ): Promise<UserResponse> {
    try {
      const user = await this.usersService.createUser(signUpUserInput);
      const token = this.jwtService.sign({ userId: user.id });
      res.cookie('jwt', token, { httpOnly: true });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  logOut(@ResGql() res: Response) {
    try {
      res.clearCookie('jwt');
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
