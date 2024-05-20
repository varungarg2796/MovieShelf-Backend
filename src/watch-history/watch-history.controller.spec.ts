import { Test, TestingModule } from '@nestjs/testing';
import { WatchHistoryController } from './watch-history.controller';
import { WatchHistoryService } from './watch-history.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { WatchHistory } from './watch-history.entity';
import { UserRating } from '../user-rating/user-rating.entity';

describe('WatchHistoryController', () => {
  let controller: WatchHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchHistoryController],
      providers: [
        WatchHistoryService,
        { provide: getRepositoryToken(WatchHistory), useClass: Repository },
        { provide: getRepositoryToken(UserRating), useClass: Repository },
        { provide: Connection, useValue: {} }, // Add this line
      ],
    }).compile();

    controller = module.get<WatchHistoryController>(WatchHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});