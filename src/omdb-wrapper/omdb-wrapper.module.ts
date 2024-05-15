import { Module } from '@nestjs/common';
import { OmdbWrapperService } from './omdb-wrapper.service';
import { OmdbWrapperController } from './omdb-wrapper.controller';

@Module({
  providers: [OmdbWrapperService],
  controllers: [OmdbWrapperController],
})
export class OmdbWrapperModule {}
