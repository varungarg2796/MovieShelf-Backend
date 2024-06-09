import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity('watchlist')
export class Watchlist {
  @PrimaryColumn()
  watchlistid: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'imdbid' })
  imdbid: string;

  @CreateDateColumn()
  createdon: Date;
}