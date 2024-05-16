import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperService } from './omdb-wrapper.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OmdbWrapperService', () => {
  let service: OmdbWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OmdbWrapperService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<OmdbWrapperService>(OmdbWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return movie data when searching by title', async () => {
    const result = { Title: 'Test Movie' };
    mockedAxios.get.mockResolvedValue({ data: result });

    expect(await service.searchMoviesByTitle('test')).toEqual(result);
  });

  it('should throw an error when request times out', async () => {
    mockedAxios.get.mockRejectedValue({ code: 'ECONNABORTED' });

    await expect(service.searchMoviesByTitle('test')).rejects.toThrow('Request timed out');
  });

  it('should return movie data when searching by search term', async () => {
    const result = { Search: [{ Title: 'Test Movie' }] };
    mockedAxios.get.mockResolvedValue({ data: result });

    expect(await service.searchMoviesBySearchTerm('test')).toEqual(result);
  });

  it('should throw an error when request times out during search', async () => {
    mockedAxios.get.mockRejectedValue({ code: 'ECONNABORTED' });

    await expect(service.searchMoviesBySearchTerm('test')).rejects.toThrow('Request timed out');
  });
});