import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from './user.schema';

@InputType()
export class UserIdRequest {
  @Field(_type => String, { nullable: false })
  id: string;
}

@InputType()
export class NewUserRequest {
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
  createUser(data: NewUserRequest): Promise<User>;
  me(data: UserIdRequest): Promise<User>;
  getAllUsers(data: {}): Promise<MultipleUsersResponse>;
}
