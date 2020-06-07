import { User } from './user.schema';

export interface UserIdRequest {
  id: number;
}

export interface NewUserRequest {
  name: string;
  password: string;
  email: string;
  image_url?: string;
}

export interface UsersProtoService {
  createUser(data: NewUserRequest): Promise<User>;
  me(data: UserIdRequest): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
