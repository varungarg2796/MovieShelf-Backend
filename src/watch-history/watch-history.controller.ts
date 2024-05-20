import { Controller, Post, Get, Req, Body, Patch, Param, Delete } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { WatchHistory } from './watch-history.entity';
import { UserRating } from '../user-rating/user-rating.entity';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body('watchHistoryData') watchHistoryData: WatchHistory,
    @Body('userRatingData') userRatingData: UserRating
  ) {
    try {
      watchHistoryData.user_id = req.user.sub;
      return this.watchHistoryService.create(watchHistoryData, userRatingData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with creation',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    try {
      const userId = req.user.sub;
      return this.watchHistoryService.findAll(userId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with fetching data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async edit(
    @Param('id') id: number,
    @Body('watchHistoryData') watchHistoryData: Partial<WatchHistory>,
    @Body('userRatingData') userRatingData: Partial<UserRating>
  ) {
    try {
      return this.watchHistoryService.update(
        id,
        watchHistoryData,
        userRatingData
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with updating',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':userId')
  async getWatchHistoryByUserId(@Param('userId') userId: number) {
    return this.watchHistoryService.findAll(userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.watchHistoryService.delete(id);
  }
}
