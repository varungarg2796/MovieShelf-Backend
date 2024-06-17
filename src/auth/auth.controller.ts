import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  oauth2Login() {
    // Initiates the OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async oauth2Callback(@Req() req: Request,  @Res() res: Response) {
    // Extract user information from request
    console.log(req)
    console.log(req.user)
    
    const { user } = req;

    const existingUser = await this.authService.createOrUpdateUserFromGoogle(user);
    
  
    // Generate JWT for user
    const jwt = await this.authService.generateJWT(existingUser);

    res.cookie('access_token', jwt.access_token, {
      httpOnly: false,
      // secure: true, // Uncomment this line if you're using HTTPS
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  
    // Redirect to your application page
    res.redirect('http://localhost:3001');
    // Redirect to your application page with JWT
  }
}