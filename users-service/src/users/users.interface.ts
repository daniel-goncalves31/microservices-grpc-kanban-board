import { User } from './user.schema';

export interface GetUserRequest {
  id?: string;
  email?: string;
}

export interface NewUserRequest {
  name: string;
  password: string;
  email: string;
}

export interface MultipleUsersResponse {
  users: User[];
}

export interface UsersProtoService {
  createUser(data: NewUserRequest): Promise<User>;
  getUser(data: GetUserRequest): Promise<User>;
  getAllUsers(data: {}): Promise<MultipleUsersResponse>;
}
