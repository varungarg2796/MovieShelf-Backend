import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { OmdbWrapperModule } from './omdb-wrapper/omdb-wrapper.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import {Movie} from './movies/movie.entity';
import { AuthModule } from './auth/auth.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { Watchlist } from './watchlist/watchlist.entity';
import { WatchHistoryModule } from './watch-history/watch-history.module';
import { UserRatingModule } from './user-rating/user-rating.module';
import { WatchHistory } from './watch-history/watch-history.entity';
import { UserRating } from './user-rating/user-rating.entity';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserProfile } from './user-profile/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'postgres',
      entities: [User,Movie, Watchlist, WatchHistory, UserRating, UserProfile],
      synchronize: false, //recommended for prod
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigService available across your app
    }),
    UsersModule,
    OmdbWrapperModule,
    MoviesModule,
    AuthModule,
    WatchlistModule,
    WatchHistoryModule,
    UserRatingModule,
    UserProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
