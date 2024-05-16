import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperService } from './omdb-wrapper.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OmdbWrapperService', () => {
  let service: OmdbWrapperService;
  let mockAxiosInstance;

  beforeEach(async () => {
    mockAxiosInstance = {
      get: jest.fn(),
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbWrapperService, { provide: ConfigService, useValue: { get: jest.fn() } }],
    }).compile();

    service = module.get<OmdbWrapperService>(OmdbWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search movies by title', async () => {
    const result = { data: {} };
    mockAxiosInstance.get.mockResolvedValue(result);

    expect(await service.searchMoviesByTitle('test')).toBe(result.data);
  });
});