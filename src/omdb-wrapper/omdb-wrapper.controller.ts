import { Controller, Get, Query } from '@nestjs/common';
import { OmdbWrapperService } from './omdb-wrapper.service';

@Controller('omdb-wrapper')
export class OmdbWrapperController {

  constructor(private readonly omdbWrapperService: OmdbWrapperService) {}

  @Get('movie')
  async getMovieData(@Query('title') title: string) {
    return this.omdbWrapperService.searchMoviesByTitle(title);
  }
}
