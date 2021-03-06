import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { GetUserRequest, NewUserRequest } from './users.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.user.find();
  }

  async findUserByIdOrEmail({ id, email }: GetUserRequest) {
    if (id) return this.user.findById(id);
    else return this.user.findOne({ email });
  }

  async insertUser(user: NewUserRequest) {
    return await this.user.create({ ...user });
  }
}
