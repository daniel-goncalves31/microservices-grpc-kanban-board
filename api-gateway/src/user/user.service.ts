import { Injectable } from '@nestjs/common';

interface GRPCUserService {
  me(data: { id: number }): any;
}

@Injectable()
export class UserService {}
