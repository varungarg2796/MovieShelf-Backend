import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { WatchHistory } from './watch-history.entity';
import { UserRating } from '../user-rating/user-rating.entity';

@Injectable()
export class WatchHistoryService {
  constructor(
    private connection: Connection,
    @InjectRepository(WatchHistory)
    private watchHistoryRepository: Repository<WatchHistory>,
    @InjectRepository(UserRating)
    private userRatingRepository: Repository<UserRating>,
  ) {}

  async create(watchHistoryData: WatchHistory, userRatingData: UserRating) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
            console.log(watchHistoryData)
            const watchHistory = this.watchHistoryRepository.create(watchHistoryData);
            console.log(watchHistory)
            const savedWatchHistory = await queryRunner.manager.save(watchHistory);
            console.log(savedWatchHistory)
            const userRating = this.userRatingRepository.create({
                ...userRatingData,
                watchHistory: savedWatchHistory,
            });
            await queryRunner.manager.save(userRating);
            await queryRunner.commitTransaction();

      return savedWatchHistory;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(userId: number): Promise<WatchHistory[]> {
    return this.watchHistoryRepository.find({ where: { user_id: userId },relations: ["userRating", "imdbid"]});
  }

  async update(
    id: number,
    watchHistoryData: Partial<WatchHistory>,
    userRatingData: Partial<UserRating>,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const watchHistory = await queryRunner.manager.findOne(WatchHistory, { where: { watch_history_id: id } });
      if (!watchHistory) {
        throw new NotFoundException('Watch history not found');
      }

      const userRating = await queryRunner.manager.findOne(UserRating, { where: { watchHistory: watchHistory } });
      if (!userRating) {
        throw new NotFoundException('User rating not found');
      }

      if ('imdb' in watchHistoryData) {
        delete watchHistoryData.imdb;
      }

      Object.assign(watchHistory, watchHistoryData);
      Object.assign(userRating, userRatingData);

      await queryRunner.manager.save(watchHistory);
      await queryRunner.manager.save(userRating);

      await queryRunner.commitTransaction();

      return { watchHistory, userRating };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    const queryRunner = this.connection.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const watchHistory = await queryRunner.manager.findOne(WatchHistory, { where: { watch_history_id: id }, relations: ["userRating"] });
      console.log(watchHistory)
      if (!watchHistory) {
        throw new NotFoundException(`Watch history with ID "${id}" not found`);
      }
  
      await queryRunner.manager.delete(UserRating, watchHistory.userRating.user_rating_id);
      await queryRunner.manager.delete(WatchHistory, id);
  
      await queryRunner.commitTransaction();
  
      return { message: `Watch history with ID "${id}" has been successfully deleted` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}