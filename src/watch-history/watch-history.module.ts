import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WatchHistoryController } from './watch-history.controller';
import { WatchHistoryService } from './watch-history.service';
import { JwtAuthMiddleware } from 'src/auth/jwt-auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchHistory } from './watch-history.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRatingModule } from 'src/user-rating/user-rating.module';
import { UserRating } from 'src/user-rating/user-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory]), 
  TypeOrmModule.forFeature([UserRating]),
  AuthModule, UserRatingModule],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService]
})
export class WatchHistoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('watch-history');
  }
}

