// watchlist.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistService } from './watchlist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Watchlist } from './watchlist.entity';

describe('WatchlistService', () => {
  let service: WatchlistService;
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchlistService,
        {
          provide: getRepositoryToken(Watchlist),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WatchlistService>(WatchlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a watchlist item', async () => {
    const imdbid = 'tt1234567';
    const user_id = 1;
    const watchlist = new Watchlist();
    mockRepository.create.mockReturnValue(watchlist);
    mockRepository.save.mockResolvedValue(watchlist);
  
    const result = await service.create(imdbid, user_id);
  
    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledWith({ imdbid, user_id });
    expect(mockRepository.save).toHaveBeenCalledWith(watchlist);
  });

  it('should delete a watchlist item', async () => {
    const id = 1;
    mockRepository.delete.mockResolvedValue({ affected: 1 }); // mock the delete method to resolve with an object that has an affected property of 1

    await service.delete(id);

    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });
});