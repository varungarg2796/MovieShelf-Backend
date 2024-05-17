import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, email: string, password: string): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.createUser(username, email, password);
      if (!user) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add user',
        }, HttpStatus.BAD_REQUEST);
      }
      const jwt = await this.generateJWT(user);
      return jwt;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Unable to add user',
      }, HttpStatus.BAD_REQUEST);
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
}