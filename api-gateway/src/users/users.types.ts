import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from './user.schema';

export class GetUserRequest {
  id?: string;
  email?: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  email: string;
}

@InputType()
export class SignUpUserInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  email: string;
}

@ObjectType()
export class MultipleUsersResponse {
  @Field(() => [User], { nullable: false })
  users: User[];
}

export interface UsersProtoService {
  createUser(data: SignUpUserInput): Observable<User>;
  getUser(data: GetUserRequest): Observable<User>;
  getAllUsers(data: {}): Observable<MultipleUsersResponse>;
}
