import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './movie.entity';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtAuthMiddleware } from '../auth/jwt-auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('movies');
  }
}