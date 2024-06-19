import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  create(movie: Movie): Promise<Movie> {
    console.log(movie);
    return this.moviesRepository.save(movie);
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    return this.moviesRepository.find({
      where: { imdbrating: Not(IsNull()) },
      order: {
        imdbrating: 'DESC',
      },
      take: 15,
    });
  }
}