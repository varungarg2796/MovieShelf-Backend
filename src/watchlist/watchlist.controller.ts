import { Controller, Get, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { Watchlist } from './watchlist.entity';
import { Delete, Param } from '@nestjs/common';


@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  async create(@Body('imdbid') imdbid: string, @Req() request: any): Promise<Watchlist> {
    try {
      return await this.watchlistService.create(imdbid, request.user.sub);
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error creating watchlist item',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Req() request: any): Promise<Watchlist[]> {
    try {
      return await this.watchlistService.findAll(request.user.sub);
    } catch (error) {
        console.log(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error fetching watchlist items',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.watchlistService.delete(id);
  }
}