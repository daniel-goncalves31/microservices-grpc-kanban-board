import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  providers: [UserService, UsersResolver],
})
export class UserModule {}
