import { Injectable } from '@nestjs/common';
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

  async create(imdbid: string, user_id: number): Promise<Watchlist> {
    const watchlist = this.watchlistRepository.create({ imdbid, user_id });
    return this.watchlistRepository.save(watchlist);
  }

  async findAll(user: User): Promise<Watchlist[]> {
    return this.watchlistRepository.find({ where: { user_id: user.user_id }, relations: ["imdbid"] });
  }

  async delete(id: number): Promise<void> {
    await this.watchlistRepository.delete(id);
  }
}
