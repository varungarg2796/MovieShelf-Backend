import { Test, TestingModule } from '@nestjs/testing';
import { UserRatingController } from './user-rating.controller';

describe('UserRatingController', () => {
  let controller: UserRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRatingController],
    }).compile();

    controller = module.get<UserRatingController>(UserRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
