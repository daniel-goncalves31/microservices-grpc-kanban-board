import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

describe('User Controller', () => {
  let controller: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersResolver],
    }).compile();

    controller = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
