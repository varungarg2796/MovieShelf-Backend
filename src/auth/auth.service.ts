import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserProfileService } from '../users/user-profile.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userProfileService: UserProfileService,
    @InjectConnection() private connection: Connection, // Inject the TypeORM connection
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ access_token: string }> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.usersService.createUser(username, email, password);
      if (!user) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add user',
        }, HttpStatus.BAD_REQUEST);
      }
      // Create user profile
      await this.userProfileService.createUserProfile(user.user_id, firstName, lastName);
      const jwt = await this.generateJWT(user);
      await queryRunner.commitTransaction();
      return jwt;
    } catch (error) {
      // If we have errors we should rollback the changes
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Unable to add user',
      }, HttpStatus.BAD_REQUEST);
    } finally {
      // You should release query runner which is manually created:
      await queryRunner.release();
    }
  }

  
  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.validateUser(username, password);
      if (!user) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid credentials',
        }, HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid credentials',
      }, HttpStatus.UNAUTHORIZED);
    }
  }

  async generateJWT(user: User): Promise<{ access_token: string }> {
    try {
      const payload = { username: user.username, sub: user.user_id };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error generating JWT',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid token',
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}