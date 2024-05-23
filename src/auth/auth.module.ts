import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.registerAsync({
      imports: [ConfigModule, UserProfileModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    UserProfileModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserProfileService],
  exports: [AuthService],
})
export class AuthModule {/*...*/}