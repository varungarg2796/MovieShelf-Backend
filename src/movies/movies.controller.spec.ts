import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import Movie from './movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    service = { findAll: jest.fn().mockResolvedValue([]) } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: service }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all movies', async () => {
    const result: Movie[] = [{
      title: 'Test Movie', imdbid: '', year: 0, rated: '', released: new Date(), runtime: 0, genre: '', director: '', writers: '', actors: '', plot: '', languages: '', country: '', awards: '', poster: '', metascore: 0, imdbrating: 0, imdbvotes: 0, box_office: '',
      production: ''
    }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });
});