import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.user.find();
  }
}
