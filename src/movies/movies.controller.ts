import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('top-rated')
  getPopularMovies(): Promise<Movie[]> {
    return this.moviesService.getTopRatedMovies();
  }

  @Post()
  create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }
  
}