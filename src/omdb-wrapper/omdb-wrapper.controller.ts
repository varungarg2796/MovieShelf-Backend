import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { OmdbWrapperService } from './omdb-wrapper.service';

@Controller('omdb-wrapper')
export class OmdbWrapperController {

  constructor(private readonly omdbWrapperService: OmdbWrapperService) {}

  @Get('movie')
  async getMovieData(@Query('title') title: string) {
    if (!title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }
    return this.omdbWrapperService.searchMoviesByTitle(title);
  }
}