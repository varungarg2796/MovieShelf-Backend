// watch-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { UserRating } from '../user-rating/user-rating.entity';
import Movie from '../movies/movie.entity';


@Entity('watch_history')
export class WatchHistory {
  @PrimaryGeneratedColumn()
  watch_history_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'imdbid' })
  imdbid: string;

  @Column()
  watch_date: Date;

  @Column({ nullable: true })
  feeling: string;

  @Column({ nullable: true })
  watched_with: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  rewatched: boolean;

  @Column({ nullable: true })
  notes: string;

  @OneToOne(() => UserRating, userRating => userRating.watchHistory, { cascade: true })
  userRating: UserRating;
}