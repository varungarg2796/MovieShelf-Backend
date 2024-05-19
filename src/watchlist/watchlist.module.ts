import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './watchlist.entity';
import { WatchlistController } from './watchlist.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtAuthMiddleware } from '../auth/jwt-auth.middleware';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Watchlist]), AuthModule],
  providers: [WatchlistService],
  controllers: [WatchlistController]
})
export class WatchlistModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('watchlist');
  }
}
