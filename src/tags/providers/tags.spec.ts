import { Test, TestingModule } from '@nestjs/testing';
import { Tags } from './tags.service';

describe('Tags', () => {
  let provider: Tags;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tags],
    }).compile();

    provider = module.get<Tags>(Tags);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
