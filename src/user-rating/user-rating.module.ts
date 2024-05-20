import { Module } from '@nestjs/common';
import { UserRatingService } from './user-rating.service';
import { UserRatingController } from './user-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRating } from './user-rating.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRating]), AuthModule],
  providers: [UserRatingService],
  controllers: [UserRatingController]
})
export class UserRatingModule {}
