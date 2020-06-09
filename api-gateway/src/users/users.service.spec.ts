import { Test, TestingModule } from '@nestjs/testing';
import { getFakeUsers } from '../shared/mock-data';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;
  const mockUsers = getFakeUsers();
  const mockuser = mockUsers[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
