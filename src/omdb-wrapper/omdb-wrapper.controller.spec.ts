import { Test, TestingModule } from '@nestjs/testing';
import { OmdbWrapperController } from './omdb-wrapper.controller';

describe('OmdbWrapperController', () => {
  let controller: OmdbWrapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OmdbWrapperController],
    }).compile();

    controller = module.get<OmdbWrapperController>(OmdbWrapperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
