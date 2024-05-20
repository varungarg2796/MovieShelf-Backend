// user-rating.entity.ts
import { WatchHistory } from '../watch-history/watch-history.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('user_rating')
export class UserRating {
  @PrimaryGeneratedColumn()
  user_rating_id: number;

  @OneToOne(() => WatchHistory, watchHistory => watchHistory.userRating)
  @JoinColumn({ name: 'watch_history_id' })
  watchHistory: WatchHistory;

  @Column()
  rating_value: number;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: true })
  recommended: boolean;

  @Column({ nullable: true })
  tags: string;

}