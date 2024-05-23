import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string, 
  ): Promise<{ access_token: string }> {
    try {
      return await this.authService.signUp(username, email, password, firstname, lastname);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Unable to sign up',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid credentials',
        }, HttpStatus.UNAUTHORIZED);
      }
      return this.authService.generateJWT(user);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid credentials',
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}