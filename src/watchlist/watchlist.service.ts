import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from './watchlist.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>
  ) {}

  async create(imdbid: string, user_id: number) {
    const existingEntry = await this.watchlistRepository.findOne({ where: { imdbid, user_id } });
    if (existingEntry) {
      throw new HttpException('Movie already exists in the watchlist', HttpStatus.BAD_REQUEST);
    }
    const watchlist = new Watchlist();
    watchlist.imdbid = imdbid;
    watchlist.user_id = user_id;
    return this.watchlistRepository.save(watchlist);
  }

  async findAll(user_id: number): Promise<Watchlist[]> {
    return this.watchlistRepository.find({ where: { user_id: user_id }, relations: ["imdbid"] });
  }

  async delete(id: number): Promise<void> {
    await this.watchlistRepository.delete(id);
  }
}
