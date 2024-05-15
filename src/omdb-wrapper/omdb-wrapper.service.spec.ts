import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperService } from './omdb-wrapper.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

jest.mock('axios');

describe('OmdbWrapperService', () => {
  let service: OmdbWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbWrapperService, ConfigService],
    }).compile();

    service = module.get<OmdbWrapperService>(OmdbWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search movies by title', async () => {
    const result = { data: {} };
    jest.spyOn(axios, 'get').mockResolvedValue(result);

    expect(await service.searchMoviesByTitle('test')).toBe(result.data);
  });
});