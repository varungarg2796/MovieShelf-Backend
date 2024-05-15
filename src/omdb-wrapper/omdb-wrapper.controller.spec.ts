import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperController } from './omdb-wrapper.controller';
import { OmdbWrapperService } from './omdb-wrapper.service';
import { HttpStatus } from '@nestjs/common';

describe('OmdbWrapperController', () => {
  let controller: OmdbWrapperController;
  let service: OmdbWrapperService;

  beforeEach(async () => {
    service = { searchMoviesByTitle: jest.fn().mockResolvedValue({}) } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OmdbWrapperController],
      providers: [{ provide: OmdbWrapperService, useValue: service }],
    }).compile();

    controller = module.get<OmdbWrapperController>(OmdbWrapperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get movie data', async () => {
    const result = {};
    jest.spyOn(service, 'searchMoviesByTitle').mockResolvedValue(result);
    expect(await controller.getMovieData('test')).toBe(result);
  });

  it('should throw an error if title is not provided', async () => {
    try {
      await controller.getMovieData('');
    } catch (e) {
      expect(e.status).toBe(HttpStatus.BAD_REQUEST);
      expect(e.message).toBe('Title is required');
    }
  });
});