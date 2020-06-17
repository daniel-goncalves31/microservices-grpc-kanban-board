import { Test, TestingModule } from '@nestjs/testing';
import { StagesService } from './stages.service';

describe('StagesService', () => {
  let service: StagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StagesService],
    }).compile();

    service = module.get<StagesService>(StagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
