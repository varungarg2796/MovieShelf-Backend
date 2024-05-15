import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperService } from './omdb-wrapper.service';

describe('OmdbWrapperService', () => {
  let service: OmdbWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbWrapperService],
    }).compile();

    service = module.get<OmdbWrapperService>(OmdbWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
