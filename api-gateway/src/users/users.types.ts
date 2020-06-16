import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  password: string;
}

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
  @Field(() => [UserResponse], { nullable: false })
  users: UserResponse[];
}

export interface UsersProtoService {
  createUser(data: SignUpUserInput): Observable<UserResponse>;
  getUser(data: GetUserRequest): Observable<UserResponse>;
  getAllUsers(data: {}): Observable<MultipleUsersResponse>;
}
