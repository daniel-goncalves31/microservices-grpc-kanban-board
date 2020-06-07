import { Observable } from 'rxjs';

interface UserId {
  id: number;
}

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}

export interface GrpcUserService {
  me(data: UserId): Observable<User>;
}
