import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from './user.schema';

export class GetUserRequest {
  id?: string;
  email?: string;
}

@InputType()
export class LoginUserInput {
  @Field(_type => String, { nullable: false })
  password: string;

  @Field(_type => String, { nullable: false })
  email: string;
}

@InputType()
export class SignUpUserInput {
  @Field(_type => String, { nullable: false })
  name: string;

  @Field(_type => String, { nullable: false })
  password: string;

  @Field(_type => String, { nullable: false })
  email: string;

  @Field(_type => String, { nullable: true })
  image_url?: string;
}

@ObjectType()
export class MultipleUsersResponse {
  @Field(type => [User]!, { nullable: false })
  users: User[];
}

export interface UsersProtoService {
  createUser(data: SignUpUserInput): Observable<User>;
  getUser(data: GetUserRequest): Observable<User>;
  getAllUsers(data: {}): Observable<MultipleUsersResponse>;
}
