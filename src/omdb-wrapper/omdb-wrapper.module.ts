import { Module } from '@nestjs/common';
import { OmdbWrapperService } from './omdb-wrapper.service';
import { OmdbWrapperController } from './omdb-wrapper.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtAuthMiddleware } from '../auth/jwt-auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [OmdbWrapperService],
  controllers: [OmdbWrapperController],
})
export class OmdbWrapperModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('omdb-wrapper');
  }
}