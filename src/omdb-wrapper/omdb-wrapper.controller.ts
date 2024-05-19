import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { OmdbWrapperService } from './omdb-wrapper.service';

@Controller('omdb-wrapper')
export class OmdbWrapperController {

  constructor(private readonly omdbWrapperService: OmdbWrapperService) {}

  @Get('movie')
  async getMovieData(@Query('title') title: string, @Query('search') search: string) {
    if (!title && !search) {
      throw new HttpException('Title or Search is required', HttpStatus.BAD_REQUEST);
    }
    if(title){
      return this.omdbWrapperService.searchMoviesByTitle(title);
    } else {
      return this.omdbWrapperService.searchMoviesBySearchTerm(search);
    }
    
  }
}