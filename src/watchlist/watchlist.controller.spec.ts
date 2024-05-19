// watchlist.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { Watchlist } from './watchlist.entity';

describe('WatchlistController', () => {
  let controller: WatchlistController;
  const mockService = {
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchlistController],
      providers: [
        {
          provide: WatchlistService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WatchlistController>(WatchlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a watchlist item', async () => {
    const imdbid = 'tt1234567';
    const request = { user: { sub: 'user1' } };
    mockService.create.mockResolvedValue(new Watchlist());

    const result = await controller.create(imdbid, request);

    expect(result).toBeDefined();
    expect(mockService.create).toHaveBeenCalledWith(imdbid, request.user.sub);
  });

  it('should delete a watchlist item', async () => {
    const id = 1;
    mockService.delete.mockResolvedValue(id);

    await controller.delete(id);

    expect(mockService.delete).toHaveBeenCalledWith(id);
  });
  
});